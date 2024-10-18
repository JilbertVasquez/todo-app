
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_app_client.Api.Data;
using todo_app_client.Api.Data.Dtos.UserDtos;
using todo_app_client.Api.Models;

namespace todo_app_client.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _db;

        public UserController(
            IMapper mapper,
            DataContext db
        )
        {
            _mapper = mapper;
            _db = db;
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
                throw new Exception("Username or email is already taken.");

            var user = new User(dto)
            {
                CreateDate = DateTime.UtcNow
            };
            _db.Users.Add(user);

            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}