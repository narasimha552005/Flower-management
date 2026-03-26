import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          console.log('Login Successful:', res);
          localStorage.setItem('userEmail', this.loginForm.value.email);
          if (res.token) {
            localStorage.setItem('authToken', res.token);
          }
          if (res.fullName) {
            localStorage.setItem('userName', res.fullName);
          }
          // Proceed to Phase 2: Expertise Discovery or Main Site
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Login error', err);
          alert('Login failed. Please check your credentials and try again.');
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  goToSignup() {
    this.router.navigate(['/auth/signup']);
  }
}
