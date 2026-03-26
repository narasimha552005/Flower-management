import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent implements OnInit {
  verifyForm: FormGroup;
  isSubmitting = false;
  email: string | null = '';

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.verifyForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      this.isSubmitting = true;
      const otpValue = this.verifyForm.get('otp')?.value;
      console.log(`Verifying OTP ${otpValue} against MailKit sent code...`);
      
      this.authService.verify({ email: this.email, otp: otpValue }).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          console.log('OTP Verified - Access Granted:', res);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('OTP Verification failed:', err);
        }
      });
    } else {
      this.verifyForm.get('otp')?.markAsTouched();
    }
  }

  resendOtp() {
    console.log('Resending OTP via MailKit...');
  }
}
