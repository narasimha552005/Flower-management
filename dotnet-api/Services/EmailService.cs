using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace RangaFlowers.API.Services
{
    public interface IEmailService
    {
        Task SendOtpEmailAsync(string toEmail, string otp);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendOtpEmailAsync(string toEmail, string otp)
        {
            // Mocked email send since local SMTP isn't configured
            Console.WriteLine($"Mock Email sent to {toEmail} with OTP: {otp}");
            await Task.CompletedTask;
        }
    }
}
