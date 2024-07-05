import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsService } from '../../core/services/userdetails_service/user-details.service';
import { JwtDecoderService } from '../../core/jwt_decoder/jwt-decoder.service';
import { CommonModule } from '@angular/common';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AuthnavbarComponent]
})
export class UserAccountComponent implements OnInit {
  form: FormGroup;
  userId: number;
  user: any; 

  constructor(private fb: FormBuilder, private userService: UserDetailsService, private jwtService: JwtDecoderService) {
    this.userId = this.jwtService.userId; 
    this.form = this.fb.group({
      userName: [''], 
      email: [''],
      currency: [null],  
      createdDate: [{value: '', disabled: true}]  
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        console.log(data);  
        if (data) {
          this.user = data;
          const formData = {
            userName: this.user.userName,
            email: this.user.email,
            currency: this.user.currency || 'No currency set', 
            createdDate: this.formatDate(this.user.createdDate) 
          };
          this.form.patchValue(formData);
        }
      },
      error: (err) => console.error('Failed to load user data', err)
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  }

  onUpdate(): void {
    console.log('Update User Data', this.form.value);
  }
}
