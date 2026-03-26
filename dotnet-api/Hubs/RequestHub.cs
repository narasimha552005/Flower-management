using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace RangaFlowers.API.Hubs
{
    public class RequestHub : Hub
    {
        // Phase 3: Real-Time Tracking
        // Clients connect to this hub. When User A sends a request, 
        // the server pushes "ReceiveRequestUpdate" to User B's dashboard.
        
        public async Task SendRequestNotification(string recipientUserId, string message)
        {
            // In a real app, map recipientUserId to their active ConnectionId
            await Clients.User(recipientUserId).SendAsync("ReceiveRequestUpdate", message);
        }
    }
}
