import { AuthService } from './../../core/services/auth_service/auth.service';
import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UnauthnavbarComponent } from '../../common/navbar/unauthnavbar/unauthnavbar.component';
import { Login } from '../../core/interfaces/LoginDTO/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, CommonModule, UnauthnavbarComponent, RouterLink, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = "";
  password = ""; 
  user!: Login;
  submitted = false;
  authService!: AuthService;

  constructor(private _authService: AuthService, private matSnackBar: MatSnackBar, private router: Router) {
    this.authService = _authService;
  }

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  onLogin(): void {
    this.submitted = true;
    if (this.usernameFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }

    this.user = {
      userName: this.usernameFormControl.value || '',
      password: this.passwordFormControl.value || ''
    };

    this.authService.login(this.user).subscribe({
      next: (response) => {
        this.matSnackBar.open("You are logged in", 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['']);
      },
      error: (error) => {
        const errorMessage = error?.error?.response || 'Login failed. Please try again.';
        this.matSnackBar.open(errorMessage, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }
}
