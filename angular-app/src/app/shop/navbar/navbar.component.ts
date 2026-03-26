import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  cartCount = 0;

  toggleCart() {
    // Implement cart toggle logic via a shared service later
    console.log('Toggling cart from navbar');
  }
}
