using System;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Service;
using Domain;
using Domain.Constant;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

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
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            TokenService tokenService, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _configuration = configuration;
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri("https://graph.facebook.com")
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);

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
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (_userManager.Users.Any(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email is existed");
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
                return BadRequest("Sign up fail");
            }

            return CreateUserObject(user);

        }

        [Authorize]
        [HttpPost("update-account")]
        public async Task<ActionResult<UserDto>> UpdateAccount(UpdateAccountDto updateAccountDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x =>
                x.Email == User.FindFirstValue(ClaimTypes.Email));

            if (user == null)
            {
                return BadRequest("User does not exist");
            }
            if ( !string.IsNullOrWhiteSpace(updateAccountDto.FirstName) || !string.IsNullOrWhiteSpace(updateAccountDto.LastName))
            {
                if (!string.IsNullOrWhiteSpace(updateAccountDto.FirstName))
                {
                    user.FirstName = updateAccountDto.FirstName;
                }

                if (!string.IsNullOrWhiteSpace(updateAccountDto.LastName))
                {
                    user.LastName = updateAccountDto.LastName;
                }

                await _userManager.UpdateAsync(user);
            }

            if (updateAccountDto.CurrentPassword != null && updateAccountDto.NewPassword != null)
            {
                var result = await _userManager.ChangePasswordAsync(user, updateAccountDto.CurrentPassword,
                    updateAccountDto.NewPassword);
                if (!result.Succeeded)
                {
                    return BadRequest("Error when updating account: Password incorrect");
                }
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

            var fbUrl = $"me?access_token={accessToken}&fields=name,email,picture.width(100).height(100)";

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
                Role = user.Role
            };
            return userDto;
        }
    }
}
