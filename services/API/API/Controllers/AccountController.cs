using System.Linq;
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
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
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
                Token = _tokenService.CreateToken(user)
            };
            return userDto;
        }
    }
}
