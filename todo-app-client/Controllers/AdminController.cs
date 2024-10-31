using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_app_client.Api.Data;
using todo_app_client.Api.Data.Dtos.UserDtos;
using todo_app_client.Helpers;

namespace todo_app_client.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _db;
        private readonly IAuthGuard _ag;
        private readonly IMapper _mapper;

        public AdminController(
            DataContext db,
            IAuthGuard ag,
            IMapper mapper
        )
        {
            _db = db;
            _ag = ag;
            _mapper = mapper;
        }


        [HttpGet("userlist")]
        public async Task<IActionResult> GetUserList()
        {
            _ag.EnsureRole();

            var users = await _db.Users.AsNoTracking()
            .ToListAsync();

            var userslist = _mapper.Map<List<UserDetailsDto>>(users);
            return Ok(userslist);
        }
    }
}
