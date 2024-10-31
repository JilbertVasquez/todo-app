using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_app_client.Api.Data;
using todo_app_client.Api.Data.Dtos.StatusDtos;

namespace todo_app_client.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _db;

        public StatusController(IMapper mapper, DataContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<StatusDto>>> GetStatusList()
        {
            var status = await _db.Status
                .Select(p => new StatusDto
                {
                    StatusId = p.StatusId,
                    StatusName = p.StatusName
                })
                .ToListAsync();

            return Ok(status);
        }
    }
}