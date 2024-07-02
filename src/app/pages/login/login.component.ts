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
import { AuthService } from '../../core/services/auth_service/auth.service';
import { Login } from '../../core/interfaces/LoginDTO/login.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatButton, CommonModule, MatError, UnauthnavbarComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = "";
  password = ""; 
  user!: Login;
  constructor(private authService: AuthService, private matSnackBar: MatSnackBar, private router: Router){
    
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)])

  onLogin(): void {
    this.user = {
      email: this.emailFormControl.value || '',
      password: this.passwordFormControl.value || ''
    };
    this.authService.login(this.user).subscribe({
      next: (response) => {this.matSnackBar.open(response.response, 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
      });
      this.router.navigate(['/']);
    },
      error: (error) => {
        this.matSnackBar.open(error.error.response, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }
}