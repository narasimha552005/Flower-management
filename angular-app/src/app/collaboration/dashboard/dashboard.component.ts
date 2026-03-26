import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private hubConnection: signalR.HubConnection | undefined;
  requests: any[] = [];
  notifications: string[] = [];

  ngOnInit() {
    this.startConnection();
    this.addReceiveListener();
    this.fetchRequests(); // Initial load
  }

  fetchRequests() {
    // GET /api/requests
    this.requests = [
      { id: 'req1', senderName: 'Alice', status: 'Pending', type: 'incoming' }
    ];
  }

  startConnection() {
    // Phase 3: Setup SignalR for real-time dashboard status syncing
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/hubs/requests')
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR Hub Connection Started'))
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  addReceiveListener() {
    this.hubConnection?.on('ReceiveRequestUpdate', (data: any) => {
       console.log('Real-time update received:', data);
       this.notifications.unshift(`[${new Date().toLocaleTimeString()}] ${data.message || data}`);
       
       // Force refresh to get latest status
       // this.fetchRequests();
    });
  }

  respondToRequest(reqId: string, status: string) {
    // POST /api/requests/{id}/respond?status=Accepted
    console.log(`Responding to ${reqId} with ${status}`);
    const req = this.requests.find(r => r.id === reqId);
    if (req) {
      req.status = status;
    }
  }

  ngOnDestroy() {
    this.hubConnection?.stop();
  }
}
