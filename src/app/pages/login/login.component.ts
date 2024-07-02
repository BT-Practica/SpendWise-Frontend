import { AuthService } from './../../core/services/auth_service/auth.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UnauthnavbarComponent } from '../../common/navbar/unauthnavbar/unauthnavbar.component';
// import { AuthService } from '../../core/services/auth_service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatButton, CommonModule, MatError, UnauthnavbarComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  /**
   *
   */
  constructor(private readonly loginService: AuthService) {
  }

  email = "";
  password = ""; 
  user!: Login;
  authService!: AuthService;
  constructor(private _authService: AuthService, private matSnackBar: MatSnackBar, private router: Router){
    this.authService = _authService;
  }

  emailFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)])

  onLogin(): void {
    this.user = {
      userName: this.emailFormControl.value || '',
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