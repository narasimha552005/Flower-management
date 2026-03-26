using System;
using System.Collections.Generic;

namespace RangaFlowers.API.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        
        // Track the user's latest sign-in
        public DateTime? LoginTimestamp { get; set; }
        
        // Phase 1 verification
        public bool IsVerified { get; set; } = false;
        
        // Navigation Properties for Phase 2/3
        public PeerProfile Profile { get; set; }
        public ICollection<CollaborationRequest> SentRequests { get; set; }
        public ICollection<CollaborationRequest> ReceivedRequests { get; set; }
    }

    public class PeerProfile 
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; }
        public User User { get; set; }
        public string Title { get; set; }
        public string Bio { get; set; }
        
        // Comma-separated or serialized JSON depending on DB dialect
        public string Skills { get; set; } 
    }

    public class ProjectIdea
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public string Description { get; set; }
        public string RequiredSkills { get; set; }
    }

    public class CollaborationRequest
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid SenderId { get; set; }
        public User Sender { get; set; }
        
        public Guid RecipientId { get; set; }
        public User Recipient { get; set; }
        
        // Status: Pending, Accepted, Rejected
        public string Status { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class ServiceBooking
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Email { get; set; }
        public string Items { get; set; }
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
    }
}
