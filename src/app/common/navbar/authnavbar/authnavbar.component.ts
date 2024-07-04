import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogConfig, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Route, Router, RouterLink } from '@angular/router';
import { ExpensesComponent } from '../../../pages/expenses/expenses.component';
import { IncomesComponent } from '../../../pages/incomes/incomes.component';
import { SavingsComponent } from '../../../pages/savings/savings.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth_service/auth.service';
import { Injectable } from '@angular/core'
import { ExpensecategoriesService } from '../../../core/services/expensecategories_service/expensecategories.service';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomesService } from '../../../core/services/incomes_service/incomes.service';
import { AddIncome } from '../../../core/interfaces/IncomeDTO/AddIncome';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseCategories } from '../../../core/interfaces/ExpenseCategoriesDTO/expense_categories.interface';
import { ExtractIncomeCategories } from '../../../core/interfaces/IncomeCategoriesDTO/extractincomecategories.interface';
import { JwtDecoderService } from '../../../core/jwt_decoder/jwt-decoder.service';

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
    // this.authService.signOut();
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
    const incomeDialogRef = this.dialog.open(ExpenseDialogContent);
  }
  public expenseDialog(){
    const incomeDialogRef = this.dialog.open(ExpenseDialogContent);
  }
  public closeDialog(){
    this.dialog.closeAll();
  }
}

@Component({
  selector: 'income-dialog-content',
  templateUrl: './income-dialog.content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ExpensesComponent, IncomesComponent, SavingsComponent, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatRadioModule, ReactiveFormsModule, FormsModule],
})
export class IncomeDialogContent{
  incomeCategories: any[] = [];
  errorMessage: string = '';
  formIncomeDialog!: FormGroup;
  radioButtonChecked = false;
  userIncome!: AddIncome;

  selectedCategory: string = '';
  categoryId: number = 0;
  description: string = '';
  budget: number = 0;
  reccurence: boolean = false;

  constructor(private expenseCategoriesService: ExpensecategoriesService, private fb: FormBuilder, private incomeService: IncomesService, 
    private router: Router, private matSnackBar: MatSnackBar, private jwtDecoder: JwtDecoderService){
    }
  
  ngOnInit(): void{
    this.fetchIncomeCategories();
    this.formIncomeDialog = this.fb.group({
      radioButton: [''],
      budgetControl: ['', [Validators.required, Validators.min(1)]],
      descriptionControl: ['', [Validators.maxLength(250)]],
    })
    this.formIncomeDialog.get("budgetControl")?.valueChanges.subscribe((value: number) => {
      this.formIncomeDialog.markAllAsTouched();
      this.budget = value;
    })
    this.formIncomeDialog.get("descriptionControl")?.valueChanges.subscribe((value: string) => {
      this.formIncomeDialog.markAllAsTouched();
      this.description = value;
    })
    this.formIncomeDialog.get("radioButton")?.valueChanges.subscribe((value: boolean) => {
      this.formIncomeDialog.markAllAsTouched();
      this.reccurence = value;
    })
  }

  pressRadioButton(): void {
    this.radioButtonChecked = !this.radioButtonChecked;
    this.formIncomeDialog.controls['radioButton'].setValue(this.radioButtonChecked);
  }


  changeClient(event: MatSelectChange){
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.categoryId = selectedData.value;
    this.selectedCategory = selectedData.text;
    console.log(this.selectedCategory);
  }
  
  fetchIncomeCategories(): void {
    this.incomeService.getIncomeCategoriesByUser()
      .subscribe({
        next: (data) => this.incomeCategories = data,
        error: (error) => this.errorMessage = error.message
      });
  }


  postIncome(){
    this.userIncome = {
      Income_CategoryName: this.selectedCategory,
      Amount: this.budget,
      Description: this.description,
      Reccurence: this.reccurence,
      UserId: this.jwtDecoder.userId
    }
    this.incomeService.postIncomeService(this.userIncome).subscribe({
      next: (response) => {
        const finalResponse = this.matSnackBar.open('The income was saved', 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        })
        this.router.navigate(['']);
      },
      error: (error) => {
        const errorMessage = error?.error?.response || 'The income was not saved. Please try again';
        this.matSnackBar.open(errorMessage, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    })

  }
}

@Component({
    selector: 'expense-dialog-content',
    templateUrl: './expense-dialog.content.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, ExpensesComponent, IncomesComponent, SavingsComponent, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatRadioModule, ReactiveFormsModule, FormsModule],
})
export class ExpenseDialogContent{
  formExpenseDialog!: FormGroup;
  expenseCategoryName: string = '';
  expenseCategory!: ExpenseCategories;
  constructor(private fb: FormBuilder, private expenseCategoryService: ExpensecategoriesService, private router: Router, private matSnackBar: MatSnackBar){}

  ngOnInit(){
    this.formExpenseDialog = this.fb.group({
      categoryName: ['', [Validators.required, Validators.maxLength(75), Validators.nullValidator]]
    });
    this.formExpenseDialog.get("categoryName")?.valueChanges.subscribe((value: string) => {
      this.formExpenseDialog.markAllAsTouched();
      this.expenseCategoryName = value;
    });
  }

  postExpenseCategory(){
    this.expenseCategory = {
      Name: this.expenseCategoryName,
      UserId: 1,
    }
    console.log(this.expenseCategoryName);
    this.expenseCategoryService.postNewExpenseCategory(this.expenseCategory).subscribe({
      next: (response) => {
        const finalResponse = this.matSnackBar.open('The expense category was saved', 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        })
        this.router.navigate(['']);
      },
      error: (error) => {
        const errorMessage = error?.error?.response || 'The expense category was not saved. Please try again';
        this.matSnackBar.open(errorMessage, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    })
  }
}
