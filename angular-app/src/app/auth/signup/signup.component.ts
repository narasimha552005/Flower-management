import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export function passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
  // Enforces at least 1 uppercase, 1 lowercase, 1 number, 1 special character and 8+ length
  // e.g. Saiprasad@1234
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const valid = regex.test(control.value);
  return valid ? null : { passwordComplexity: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordComplexityValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      const { confirmPassword, ...userData } = this.signupForm.value;
      this.authService.signup(userData).subscribe({
        next: (response) => {
          console.log('Signup success:', response);
          this.isSubmitting = false;
          alert('Registration successful! Please login.');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Signup error', err);
          this.isSubmitting = false;
          alert('Signup failed. Please try again.');
        }
      });
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
