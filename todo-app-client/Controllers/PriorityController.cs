
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_app_client.Api.Data;
using todo_app_client.Api.Data.Dtos.PriorityDto;

namespace todo_app_client.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriorityController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _db;

        public PriorityController(
            IMapper mapper,
            DataContext db
        )
        {
            _mapper = mapper;
            _db = db;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<PriorityDto>>> GetPriorityList()
        {
            var priorities = await _db.Priority
            .Select(p => new PriorityDto
            {
                PriorityId = p.PriorityId,
                PriorityName = p.PriorityName
            })
            .ToListAsync();

            return Ok(priorities);
        }

    }
}