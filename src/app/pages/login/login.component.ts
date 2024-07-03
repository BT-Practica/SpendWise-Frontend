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
import { Router, RouterLink } from '@angular/router';
import { UnauthnavbarComponent } from '../../common/navbar/unauthnavbar/unauthnavbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from '../../core/interfaces/LoginDTO/login.interface';
// import { AuthService } from '../../core/services/auth_service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatButton, CommonModule, MatError, UnauthnavbarComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


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
        this.matSnackBar.open("You are logged in", 'Close', { //pop up after the user loggin
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