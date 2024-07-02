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
  username = ""
  password = "";
message = "";

  emailFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)])

  onLogin(): void {
    console.log("", this.email);
    console.log("", this.password);
    this.loginService.loginUser(this.username, this.password);
    
    if(this.email === "" || this.password === "") {
      this.message = "Please complete all the fields";
    }else{
      this.message = "";
    }
  }
}