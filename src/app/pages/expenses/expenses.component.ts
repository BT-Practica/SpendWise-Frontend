import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Expenses } from '../../core/interfaces/expenses.table.interface';
import {MatTableModule} from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogDataExpenses } from '../../core/interfaces/expenses.dialog.interface';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import { ExpensesService } from '../../core/services/expenses_service/expenses.service';
import { ExpensecategoriesService } from '../../core/services/expensecategories_service/expensecategories.service';
import { IncomesComponent } from '../incomes/incomes.component';
import { Router, RouterLink } from '@angular/router';
import { MatOption, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { JwtDecoderService } from '../../core/jwt_decoder/jwt-decoder.service';
import { ExpensePost } from '../../core/interfaces/ExpensesDTO/expensesPost.inteface';
import { MatSnackBar } from '@angular/material/snack-bar';

const EXPENSES_DATA : Expenses[] = [
  {id: 1, subcategory: "Mancare", brand: "McDonalds", suma: "50", createdAt: new Date("20-03-2020")}, 
  {id: 2, subcategory: "Utilitati", brand: "Raja", suma: "120", createdAt: new Date("20-04-2020")}, 
  {id: 3, subcategory: "Imbracaminte", brand: "Zara", suma: "340", createdAt: new Date("24-04-2020")}, 
  {id: 4, subcategory: "Masina Personala", brand: "OMV", suma: "250", createdAt: new Date("21-05-2020")}, 
  {id: 5, subcategory: "Sanatate", brand: "Sensiblu", suma: "120", createdAt: new Date("28-05-2020")}
];

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [MatTableModule, MatInputModule, FormsModule, MatButtonModule, MatFormFieldModule, AuthnavbarComponent, MatIconModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  readonly dialog = inject(MatDialog);

  constructor(
    private expensesService: ExpensesService, private expenseCategoryService: ExpensecategoriesService
  ) { }

  subcategory: string = '';
  brand: string = '';
  suma: string = '';
  createdAt: Date = new Date();
  error: string = '';
  isEdit: boolean = false;

  dialogTitle: string = '';
  
  displayedColumns: string[] = ["Category", "Amount", "CreatedAt", "Description","Action"]; 
  dataSource = EXPENSES_DATA;

  modify() {

  }

  deleteExpense() : void { 
    
  }

  addExpense() : void {
    const incomeDialogRef = this.dialog.open(AddExpenseDialog);
  }
}


@Component({
  selector: 'dialog-overview-example-dialog', 
  templateUrl: 'dialog-overview.html', 
  styleUrl: 'dialog-overview.scss',
  standalone: true, 
  imports: [
    MatDialogModule, MatButtonModule, ExpensesComponent, IncomesComponent, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatRadioModule, ReactiveFormsModule, FormsModule
  ],
})

export class AddExpenseDialog {
  expenseCategories: any[] = []
  categoryId: number = 0;
  selectedCategory: string = '';
  addExpenseForm!: FormGroup;
  expenseToPost!: ExpensePost;
  amount: number = 0;
  description: string = '';
  constructor(private fb: FormBuilder, private expenseCategoryService: ExpensecategoriesService, 
    private expenseService: ExpensesService, private jwtDecoder: JwtDecoderService,
      private matSnackBar: MatSnackBar, private router: Router){}

  ngOnInit(){
    this.getExpenseCategories();
    this.addExpenseForm = this.fb.group({
      amountControl: ['', [Validators.required, Validators.min(1)]],
      descriptionControl: ['', [Validators.maxLength(50)]],
    })
    this.addExpenseForm.get("amountControl")?.valueChanges.subscribe((value: number) => {
      this.addExpenseForm.markAllAsTouched();
      this.amount = value;
    })
    this.addExpenseForm.get("descriptionControl")?.valueChanges.subscribe((value: string) => {
      this.addExpenseForm.markAllAsTouched();
      this.description = value;
    })
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

  public getExpenseCategories(){
    console.log(this.expenseCategoryService.userId);
    this.expenseCategoryService.getExpenseCategoriesByUser().subscribe({
      next: (response) => this.expenseCategories = response,
      error: (error) => console.log(error)
    })
    console.log(this.expenseCategories);
  }

  postExpense(){
  this.expenseToPost = {
    Amount: Number(this.amount),
    Description: this.description,
    UserId: Number(this.jwtDecoder.userId),
    Expense_CategoryId: this.categoryId,
    CurrencyId: 1
  }
    this.expenseService.postNewExpenseCategory(this.expenseToPost).subscribe({
      next: (response) => {
        const finalResponse = this.matSnackBar.open('The income was saved', 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        })
        this.router.navigate(['/expenses']);
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
  selector: 'dialog-delete', 
  templateUrl: './dialog-overview-delete.html', 
  styleUrl: './dialog-overview-delete.scss',
  standalone: true, 
  imports: [
    MatButtonModule, 
    MatDialogModule, 
    MatDialogActions, 
    MatDialogContent,
  ],
})

export class DialogDelete {
  readonly dialog = inject(MatDialog);

  opnDialog(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    this.dialog.open(DialogDelete, {
      width: '250px',
      enterAnimationDuration, 
      exitAnimationDuration
    })
  }
}
