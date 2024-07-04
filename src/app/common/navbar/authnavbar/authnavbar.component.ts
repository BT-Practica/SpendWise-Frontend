import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogConfig, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Route, Router, RouterLink } from '@angular/router';
import { ExpensesComponent } from '../../../pages/expenses/expenses.component';
import { IncomesComponent } from '../../../pages/incomes/incomes.component';
import { SavingsComponent } from '../../../pages/savings/savings.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth_service/auth.service';
import { Injectable } from '@angular/core'
import { ExpensecategoriesService } from '../../../core/services/expensecategories_service/expensecategories.service';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authnavbar',
  standalone: true,
  imports: [MatDialogModule, RouterLink, CommonModule, MatDialogContent, MatDialogActions ],
  templateUrl: './authnavbar.component.html',
  styleUrls: ['./authnavbar.component.scss']
})

export class AuthnavbarComponent {
  readonly dialog = inject(MatDialog);
  authService = inject(AuthService);

  constructor(
    private authService: AuthService
  ) {}

  checkIfIsLogged: boolean = this.authService.isAuthenticated();
  profilePhoto: string = '';

  openDialog() {
    const dialogRef = this.dialog.open(NavbarDialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  signOut() {
    this.authService.signOut();
  }
}

@Component({
  selector: 'navbar-dialog-content',
  templateUrl: './navbar-dialog.content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, RouterLink],
})
export class NavbarDialogContent {
  constructor(private dialog: MatDialog){}

  public incomeDialog(){
    const incomeDialogRef = this.dialog.open(IncomeDialogContent);
  }
  public savingDialog(){
    const incomeDialogRef = this.dialog.open(SavingDialogContent);
  }
  public closeDialog(){
    this.dialog.closeAll();
  }
}

@Component({
  selector: 'income-dialog-content',
  templateUrl: './income-dialog.content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ExpensesComponent, IncomesComponent, SavingsComponent, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatRadioModule],
})
export class IncomeDialogContent{
  expenseCategories: any[] = [];
  errorMessage: string = '';
  formIncomeDialog!: FormGroup;
  radioButtonChecked = false;
  constructor(private expenseCategoriesService: ExpensecategoriesService, private fb: FormBuilder){}
  
  ngOnInit(): void{
    this.fetchExpenseCategories();
    this.formIncomeDialog = this.fb.group({
      radioButton: [''],
      budgetControl: ['', [Validators.required, Validators.min(1)]],
      descriptionControl: ['', [Validators.maxLength(250)]],
    })
  }

  pressRadioButton(): void {
    this.radioButtonChecked = !this.radioButtonChecked;
    if (this.radioButtonChecked)
      this.formIncomeDialog.controls['radioButton'].setValue(false);
    else 
      this.formIncomeDialog.controls['radioButton'].setValue(true);
  }

  
  fetchExpenseCategories(): void {
    this.expenseCategoriesService.getExpenseCategoriesByUser()
      .subscribe({
        next: (data) => this.expenseCategories = data,
        error: (error) => this.errorMessage = error.message
      });
  }
}

@Component({
    selector: 'saving-dialog-content',
    templateUrl: './saving-dialog.content.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, ExpensesComponent, IncomesComponent, SavingsComponent, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule],
})
export class SavingDialogContent{
  
}
