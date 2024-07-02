import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth_service/auth.service';
import { UnauthnavbarComponent } from '../../common/navbar/unauthnavbar/unauthnavbar.component'
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule, FormsModule, ReactiveFormsModule, UnauthnavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  confirmEmail: string = '';
  password: string = '';
  confirmPassword: string = '';
  authService = inject(AuthService);
  error: string = '';

  // constructor(private authService: AuthService) {}

  register() : void {
    if(this.username == '' || this.email == '' || this.confirmEmail == '' || this.password == '' || this.confirmPassword == '') {
      this.error = "All fields must contain data!";
    } else if(this.password.length < 8) {
      this.error = "Password must have at least 8 characters!";
    } else if (!this.email.includes("@")) {
      this.error = "Please provide a valid address email!";
    } else if (this.password != this.confirmPassword) {
      this.error = "Passwords doesn't match!";
    } else if (this.email != this.confirmEmail) {
      this.error = "Emails doesn't match!";
    }  else {
      this.authService.registerUser(this.username, this.email, this.password);
    }
    if(this.email == this.confirmEmail && this.password == this.confirmPassword){
      this.authService.registerUser(this.username, this.email, this.password);
    }
    console.log("register");
  }

  onKeyDown(event: KeyboardEvent) {
    if(event.key == "Enter") {
      console.log("Button pressed");
      this.register();
    }

  }
}