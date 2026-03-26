import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { GalleryComponent } from '../gallery/gallery.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GalleryComponent, CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  categories = [
    { id: 'car', icon: 'fas fa-car', emoji: '🚗', name: 'Car Decoration', sub: '3 Designs', image: '/car.png' },
    { id: 'stage', icon: 'fas fa-church', emoji: '🏛️', name: 'Stage Decoration', sub: '3 Designs', image: '/stage.png' },
    { id: 'braid', icon: 'fas fa-spa', emoji: '💐', name: 'Braid Hair Styling', sub: '3 Styles', image: '/hair.png' },
    { id: 'bouquet', icon: 'fas fa-seedling', emoji: '🌹', name: 'Bouquets', sub: '3 Collections', image: '/bouquet.png' }
  ];

  activeCategoryId: string | null = null;
  isGalleryOpen = false;
  isMenuOpen = false;
  userEmail: string = '';
  userName: string = 'Ranga User';

  constructor(private router: Router) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail') || 'guest@rangaflowers.com';
    this.userName = localStorage.getItem('userName') || 'Ranga User';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  openGallery(id: string) {
    this.activeCategoryId = id;
    this.isGalleryOpen = true;
  }

  closeGallery() {
    this.isGalleryOpen = false;
  }

  logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    this.router.navigate(['/auth/login']);
  }
}
