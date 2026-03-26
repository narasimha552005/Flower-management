using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RangaFlowers.API.Data;
using RangaFlowers.API.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace RangaFlowers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize] // Secure phase 2 behind login
    public class ProfilesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfilesController(AppDbContext context)
        {
            _context = context;
        }

        // Phase 2: Expertise Discovery
        [HttpGet]
        public async Task<IActionResult> GetProfiles([FromQuery] string skill)
        {
            var query = _context.Profiles
                .Include(p => p.User)
                .AsQueryable();

            if (!string.IsNullOrEmpty(skill))
            {
                // LINQ Processing: filter database to match user input against expertise
                // Simple Contains for demonstration. In a real scenario, this might use full-text search.
                query = query.Where(p => p.Skills.ToLower().Contains(skill.ToLower()));
            }

            var profiles = await query
                .Select(p => new {
                    p.Id,
                    p.UserId,
                    UserName = p.User.FullName,
                    p.Title,
                    p.Bio,
                    p.Skills
                })
                .ToListAsync();

            return Ok(profiles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfile(Guid id)
        {
            var profile = await _context.Profiles
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (profile == null) return NotFound();

            return Ok(new {
                profile.Id,
                UserName = profile.User.FullName,
                profile.Title,
                profile.Bio,
                profile.Skills
            });
        }
    }
}
