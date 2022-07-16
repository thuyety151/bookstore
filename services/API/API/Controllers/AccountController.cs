using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Service;
using Application.Core;
using Domain;
using Domain.Constant;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly DataContext _context;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            TokenService tokenService, IConfiguration configuration, DataContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _configuration = configuration;
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri("https://graph.facebook.com")
            };
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(x => x.Photo).FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            return CreateUserObject(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<Result<UserDto>>> Register(RegisterDto registerDto)
        {
            if (_userManager.Users.Any(x => x.Email == registerDto.Email))
            {
                return Result<UserDto>.Failure("Email is existed");
            }

            var user = new AppUser()
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Role = Role.Customer
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return Result<UserDto>.Failure(result.Errors.FirstOrDefault()?.Description);
            }

            return Result<UserDto>.Success(CreateUserObject(user));
        }

        [Authorize]
        [HttpPost("update-account-information")]
        public async Task<ActionResult<UserDto>> UpdateAccountInfor(UpdateAccountInforDto updateAccountDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x =>
                x.Email == User.FindFirstValue(ClaimTypes.Email));

            if (user == null)
            {
                return BadRequest("User does not exist");
            }

            user.FirstName = updateAccountDto.FirstName;
            user.LastName = updateAccountDto.LastName;
            if (updateAccountDto.Photo != null)
            {
                var photo = _context.Media.SingleOrDefault(x => x.Id == updateAccountDto.Photo.Id);
                if (photo != null)
                {
                    user.Photo = photo;
                }
            }

            await _userManager.UpdateAsync(user);

            return CreateUserObject(user);
        }

        [Authorize]
        [HttpPost("update-account-password")]
        public async Task<ActionResult<UserDto>> UpdateAccountPassword(UpdateAccountPasswordDto updateAccountDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x =>
                x.Email == User.FindFirstValue(ClaimTypes.Email));

            if (user == null)
            {
                return BadRequest("User does not exist");
            }

            var result = await _userManager.ChangePasswordAsync(user, updateAccountDto.CurrentPassword,
                updateAccountDto.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest("Error when updating account: Password incorrect");
            }

            return CreateUserObject(user);
        }


        [HttpPost("facebook-login")]
        public async Task<ActionResult<UserDto>> FacebookLogin(string accessToken)
        {
            var fbVerifyKeys = _configuration["Facebook:AppId"] + "|" + _configuration["Facebook:AppSecret"];

            var verifyToken =
                await _httpClient.GetAsync($"debug_token?input_token={accessToken}&access_token={fbVerifyKeys}");

            if (!verifyToken.IsSuccessStatusCode) return Unauthorized();

            var fbUrl =
                $"me?access_token={accessToken}&fields=id,first_name,last_name,name,email,picture.width(100).height(100)";

            var response = await _httpClient.GetAsync(fbUrl);

            if (!response.IsSuccessStatusCode) return Unauthorized();

            var fbInfo = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());

            var username = (string) fbInfo.id;

            var user = await _userManager.Users.Include(x => x.Photo)
                .FirstOrDefaultAsync(x => x.UserName == username);

            if (user != null) return CreateUserObject(user);

            user = new AppUser()
            {
                Email = (string) fbInfo.email,
                UserName = (string) fbInfo.id,
                Role = Role.Customer,
                FirstName = (string) fbInfo.first_name,
                LastName = (string) fbInfo.last_name
            };

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded) return BadRequest("Problem creating user account");

            return CreateUserObject(user);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x =>
                x.Email == User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            var userDto = new UserDto()
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = _tokenService.CreateToken(user),
                Role = user.Role,
                PhotoUrl = user.Photo != null ? user.Photo.Url : ""
            };
            return userDto;
        }

        [Authorize]
        [HttpPost("save-fcm-token")]
        public async Task<ActionResult<Unit>> SaveFcmToken(string token)
        {
            // 1 token 1 user && 1 user N tokens
            var existedToken = await _context.FcmTokens.FirstOrDefaultAsync(x => x.Token == token);
            if (existedToken != null)
            {
                return Unit.Value;
            }

            var user = await _userManager.Users.Include(x => x.FcmTokens).FirstOrDefaultAsync(x =>
                x.Email == User.FindFirstValue(ClaimTypes.Email));

            user?.FcmTokens.Add(new FcmToken()
            {
                Token = token,
                User = user
            });

            await _context.SaveChangesAsync();
            return Unit.Value;
        }
        [Authorize]
        [HttpGet("all")]
        public async Task<ActionResult<List<UserOptionDto>>> GetAllAccount()
        {
            var user = await _context.Users.Include(x => x.Photo).Where(x => x.IsDeleted == false && x.Role == Role.Customer)
                .Select(x => new UserOptionDto()
                {
                    Id = x.Id,
                    Name = x.UserName,
                    PhotoUrl = x.Photo.Url,
                    FcmTokens = x.FcmTokens.Select(x => x.Token).ToList()
                }).ToListAsync();

            await _context.SaveChangesAsync();
            return user;
        }
    }
}