import { Component } from '@angular/core';
import { UnauthnavbarComponent } from '../../common/navbar/unauthnavbar/unauthnavbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [UnauthnavbarComponent, RouterLink, MatFormField, MatLabel, MatInput, CommonModule, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  form! : FormGroup;
  emailSent! : boolean;
  
  constructor(private fb: FormBuilder){
    this.emailSent = false;
  }
  
  sendEmail(){
    this.emailSent = true;
    console.log(this.emailSent);
  }
  
  ngOnInit(){
    this.form = this.fb.group({
      email:['', [Validators.required, Validators.email]]
    });
  }
}
