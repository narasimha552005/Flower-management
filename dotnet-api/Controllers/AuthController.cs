using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RangaFlowers.API.Data;
using RangaFlowers.API.DTOs;
using RangaFlowers.API.Models;
using RangaFlowers.API.Services;
using System;
using System.Threading.Tasks;

namespace RangaFlowers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;

        public AuthController(AppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("Email already exists.");

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                // In production, BCrypt would hash this
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password), 
                IsVerified = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully. You can now login." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid email or password.");

            if (!user.IsVerified) 
                return Unauthorized("Account not verified.");

            // Record login authentication to MongoDB
            user.LoginTimestamp = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            // Generate JWT (assuming Custom JWT Token Service is active globally)
            string token = "generated_jwt_token_here";

            return Ok(new { Token = token, Message = "Login successful.", FullName = user.FullName });
        }
    }
}
