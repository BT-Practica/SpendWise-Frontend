import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';
import { ExpensesHomeComponent } from '../../common/expenses-home/expenses-home.component';
import { IncomeHomeComponent } from '../../common/income-home/income-home.component';
import { UserDetailsService } from '../../core/services/userdetails_service/user-details.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AuthnavbarComponent, ExpensesHomeComponent, IncomeHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user = "John";
  userdetailtservice = inject(UserDetailsService);
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Invalid token:', Error);
      return null;
    }
  }

  getUserDetailsById() {
    const token = localStorage.getItem("token"); 
    if (token) {
      const decodedToken = this.getDecodedAccessToken(token);
      console.log(decodedToken); 
      
      if (decodedToken && decodedToken.nameid) {
        this.userdetailtservice.getUserByNameId(decodedToken.nameid).subscribe(data => {
          console.log(data);
        });
      } else {
        console.error('Decoded token does not contain nameid');
      }
    } else {
      console.error('No token found in localStorage');
    }
  }

}
