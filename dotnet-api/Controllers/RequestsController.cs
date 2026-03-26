using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using RangaFlowers.API.Data;
using RangaFlowers.API.Hubs;
using RangaFlowers.API.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace RangaFlowers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class RequestsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<RequestHub> _hubContext;

        public RequestsController(AppDbContext context, IHubContext<RequestHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendRequest([FromBody] CollaborationRequest request)
        {
            // 1. Create record with Status = Pending
            request.Status = "Pending";
            request.CreatedAt = DateTime.UtcNow;

            _context.CollaborationRequests.Add(request);
            await _context.SaveChangesAsync();

            // 2. Notification Phase: Push real-time update to Recipient's dashboard
            await _hubContext.Clients.All.SendAsync("ReceiveRequestUpdate", 
                new { 
                    RecipientId = request.RecipientId, 
                    Message = "New Collaboration Request Pending" 
                });

            return Ok(new { Message = "Request initiated successfully." });
        }

        [HttpPost("{id}/respond")]
        public async Task<IActionResult> RespondToRequest(Guid id, [FromQuery] string status)
        {
            var request = await _context.CollaborationRequests.FindAsync(id);
            if (request == null) return NotFound();

            if (status != "Accepted" && status != "Rejected")
                return BadRequest("Invalid status. Must be Accepted or Rejected.");

            // 3. Status Sync: Accept or Reject
            request.Status = status;
            await _context.SaveChangesAsync();

            // 4. Update the Sender instantly
            await _hubContext.Clients.All.SendAsync("ReceiveRequestUpdate", 
                new { 
                    SenderId = request.SenderId, 
                    Message = $"Your request was {status.ToLower()}." 
                });

            return Ok(new { Message = $"Request {status.ToLower()}." });
        }
    }
}
