import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  registerForm = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(form: any) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')
        } is required`;
      }
      if (field.errors['email']) {
        return 'Please provide a valid email address';
      }
      if (field.errors['minlength']) {
        return `Must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword.set(!this.showPassword());
    } else {
      this.showConfirmPassword.set(!this.showConfirmPassword());
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.successMessage.set(null);

      const { firstName, lastName, email, password } = this.registerForm.value;

      this.authService
        .register({
          firstName: firstName!,
          lastName: lastName!,
          email: email!,
          password: password!,
        })
        .subscribe({
          next: (response) => {
            this.isLoading.set(false);
            this.successMessage.set(response.message);
            this.registerForm.reset();

            // Redirect to login after 3 seconds
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 3000);
          },
          error: (error) => {
            console.error('Registration failed', error);
            this.errorMessage.set(error.message || 'Registration failed. Please try again.');
            this.isLoading.set(false);
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
