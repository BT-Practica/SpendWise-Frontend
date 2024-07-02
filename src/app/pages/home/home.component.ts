import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';
import { ExpensesHomeComponent } from '../../common/expenses-home/expenses-home.component';
import { IncomeHomeComponent } from '../../common/income-home/income-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AuthnavbarComponent, ExpensesHomeComponent, IncomeHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user = "John";
}
