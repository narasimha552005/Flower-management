using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RangaFlowers.API.Data;
using System.Linq;
using System.Threading.Tasks;

namespace RangaFlowers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        // Phase 2: Idea Matching based on skills
        [HttpGet("recommend")]
        public async Task<IActionResult> RecommendIdeas([FromQuery] string userSkills)
        {
            if (string.IsNullOrEmpty(userSkills))
                return BadRequest("User skills must be provided to recommend ideas.");

            // Split and clean skills
            var userSkillSet = userSkills.Split(',')
                .Select(s => s.Trim().ToLower())
                .ToList();

            // Simple intersection matching logic for "Project Ideas" that require those skills
            var allIdeas = await _context.ProjectIdeas.ToListAsync();
            
            var matchedIdeas = allIdeas.Where(idea => {
                var ideaSkills = idea.RequiredSkills.Split(',')
                    .Select(s => s.Trim().ToLower());
                // Does this idea require any skills the user possesses?
                return ideaSkills.Intersect(userSkillSet).Any();
            }).ToList();

            return Ok(matchedIdeas);
        }
    }
}
