import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';
import { ExpensesHomeComponent } from '../../common/expenses-home/expenses-home.component';
import { IncomeHomeComponent } from '../../common/income-home/income-home.component';
import { UserDetailsService } from '../../core/services/userdetails_service/user-details.service';
import { jwtDecode } from 'jwt-decode';
import { IncomesService } from '../../core/services/incomes_service/incomes.service';
import { ExpensesService } from '../../core/services/expenses_service/expenses.service';
import { SavingsService } from '../../core/services/savings_service/savings.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AuthnavbarComponent, ExpensesHomeComponent, IncomeHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private incomesService: IncomesService,
    private expensesService: ExpensesService, 
    private savingsService: SavingsService 
  ) {}

  income_total: number = 0;
  expenses_total: number = 0; 
  savings_total: number = 0;
  balance_total: number = 0;

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
