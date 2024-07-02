import { Component } from '@angular/core';
import { UnauthnavbarComponent } from '../../common/navbar/unauthnavbar/unauthnavbar.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [UnauthnavbarComponent, MatFormField, MatLabel, MatInput, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
resetPasswordForm! : FormGroup;

constructor(private fb: FormBuilder){
  this.resetPasswordForm = this.fb.group({
    newPassword: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.minLength(8), Validators.required]]
  });
}

passwordMatches(resetPasswordForm: FormGroup){
  return this.resetPasswordForm.controls["newPassword"].value === 
      resetPasswordForm.controls["confirmPassword"].value ? null : {mismatch : true}
}

onSubmit(){
  
}

}
