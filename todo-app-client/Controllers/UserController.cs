
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_app_client.Api.Data;
using todo_app_client.Api.Data.Dtos.UserDtos;
using todo_app_client.Api.Models;
using todo_app_client.Helpers;

namespace todo_app_client.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _db;
        private readonly IAuthGuard _ag;

        public UserController(
            IMapper mapper,
            DataContext db,
            IAuthGuard ag
        )
        {
            _mapper = mapper;
            _db = db;
            _ag = ag;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto dto)
        {
            if (string.IsNullOrEmpty(dto.Firstname)) return BadRequest("Invalid firstname.");
            if (string.IsNullOrEmpty(dto.Lastname)) return BadRequest("Invalid lastname.");
            if (string.IsNullOrEmpty(dto.Username) || dto.Username.Length < 3) return BadRequest("Invalid username.");
            if (string.IsNullOrEmpty(dto.Password) || dto.Password.Length < 3) return BadRequest("Invalid password.");
            if (string.IsNullOrEmpty(dto.Email)) return BadRequest("Invalid email.");

            if (await _db.Users.AnyAsync(x => (x.Username == dto.Username || x.Email == dto.Email) && x.DeleteDate == null))
                return Conflict("Username or email is already taken.");

            var user = new User(dto)
            {
                CreateDate = DateTime.UtcNow
            };
            _db.Users.Add(user);

            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginUserDto dto)
        {
            var user = _db.Users.Where(x => x.Username == dto.Username && x.DeleteDate == null).FirstOrDefault();

            if (user == null) return Unauthorized();

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                return Unauthorized();

            // var userDetails = new UserDetailsDto
            // {
            //     UserId = user.UserId,
            //     Username = user.Username 
            // };

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = _ag.EncodeToken(claims);

            return Ok( new {token});
        }
    }
}