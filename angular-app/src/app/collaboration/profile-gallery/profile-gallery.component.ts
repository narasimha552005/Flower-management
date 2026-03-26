import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-gallery.component.html',
  styleUrl: './profile-gallery.component.scss'
})
export class ProfileGalleryComponent implements OnInit {
  searchQuery = '';
  profiles: any[] = [];
  projectIdeas: any[] = [];

  constructor() {} // constructor(private http: HttpClient)

  ngOnInit() {
    this.fetchProfiles();
  }

  fetchProfiles() {
    // Phase 2: Expertise Discovery
    // this.http.get(`/api/profiles?skill=${this.searchQuery}`).subscribe(...)
    
    // Mocking response based on backend LINQ definition
    this.profiles = [
      { id: '1', userName: 'Ankem Suresh', title: 'Senior Floral Architect', bio: '50 years of Konaseema heritage styling', skills: 'floral design, architecture, stage' },
      { id: '2', userName: 'Tech Peer', title: 'Angular Developer', bio: 'Building digital interfaces', skills: 'angular, typescript, css' }
    ].filter(p => !this.searchQuery || p.skills.includes(this.searchQuery.toLowerCase()));

    this.fetchProjectIdeas();
  }

  fetchProjectIdeas() {
    // this.http.get(`/api/projects/recommend?userSkills=${this.searchQuery}`).subscribe(...)
    this.projectIdeas = [
      { title: 'Digital Mandapam App', desc: 'VR preview app for stage designs', requiredSkills: 'angular, 3d, css' },
      { title: 'Heritage Event Management', desc: 'SaaS for local weddings', requiredSkills: 'dotnet, angular' }
    ];
  }

  sendRequest(profileId: string) {
    // POST /api/requests/send { RecipientId: profileId }
    console.log(`Sending collaboration request to ${profileId}`);
    alert('Request Sent Notification Dispatched!');
  }
}
