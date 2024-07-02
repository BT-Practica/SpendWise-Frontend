import { Component, OnInit } from '@angular/core';
import { IncomeHomeComponent } from '../../common/income-home/income-home.component';
import { ExpensesHomeComponent } from '../../common/expenses-home/expenses-home.component';
import { AuthorizedNavbarComponent } from '../../common/authorized-navbar/authorized-navbar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuthorizedNavbarComponent, ExpensesHomeComponent, IncomeHomeComponent],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  basicData: any;
  basicOptions: any;
  routeTips = '/tips'
}