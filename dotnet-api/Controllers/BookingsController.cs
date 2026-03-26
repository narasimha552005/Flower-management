using Microsoft.AspNetCore.Mvc;
using RangaFlowers.API.Data;
using RangaFlowers.API.Models;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace RangaFlowers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] ServiceBooking booking)
        {
            if (string.IsNullOrEmpty(booking.Items))
                return BadRequest("No items selected for booking.");

            // Setting ID and Date explicitly just in case default initialization doesn't trigger correctly
            booking.Id = Guid.NewGuid();
            booking.BookingDate = DateTime.UtcNow;

            _context.ServiceBookings.Add(booking);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Booking created successfully.", Booking = booking });
        }

        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await _context.ServiceBookings.ToListAsync();
            return Ok(bookings);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(Guid id)
        {
            var booking = await _context.ServiceBookings.FindAsync(id);
            if (booking == null) return NotFound();
            
            _context.ServiceBookings.Remove(booking);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Booking deleted successfully" });
        }
    }
}
