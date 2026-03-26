using System.ComponentModel.DataAnnotations;

namespace RangaFlowers.API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string FullName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        // Must match Saiprasad@1234
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", 
            ErrorMessage = "Password must be at least 8 characters, including upper, lower, digit and special character.")]
        public string Password { get; set; }
    }

    public class LoginDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class VerifyOtpDto
    {
        [Required]
        public string Email { get; set; }
        
        [Required, StringLength(6, MinimumLength = 6)]
        public string Otp { get; set; }
    }
}
