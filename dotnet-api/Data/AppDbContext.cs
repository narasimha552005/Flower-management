using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;
using RangaFlowers.API.Models;

namespace RangaFlowers.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<PeerProfile> Profiles { get; set; }
        public DbSet<ProjectIdea> ProjectIdeas { get; set; }
        public DbSet<CollaborationRequest> CollaborationRequests { get; set; }
        public DbSet<ServiceBooking> ServiceBookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Map entities to collections using MongoDB provider extensions
            modelBuilder.Entity<User>().ToCollection("Users");
            // Add index for fast authentication lookups
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<PeerProfile>().ToCollection("Profiles");
            modelBuilder.Entity<ProjectIdea>().ToCollection("ProjectIdeas");
            modelBuilder.Entity<CollaborationRequest>().ToCollection("CollaborationRequests");
            modelBuilder.Entity<ServiceBooking>().ToCollection("ServiceBookings");

            // Ignore complex relational properties that MongoDB driver struggles with natively
            modelBuilder.Entity<User>().Ignore(u => u.Profile);
            modelBuilder.Entity<User>().Ignore(u => u.SentRequests);
            modelBuilder.Entity<User>().Ignore(u => u.ReceivedRequests);
            
            modelBuilder.Entity<PeerProfile>().Ignore(p => p.User);
            modelBuilder.Entity<CollaborationRequest>().Ignore(cr => cr.Sender);
            modelBuilder.Entity<CollaborationRequest>().Ignore(cr => cr.Recipient);
        }
    }
}
