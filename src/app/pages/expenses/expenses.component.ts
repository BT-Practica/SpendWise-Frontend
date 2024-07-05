import { ChangeDetectionStrategy, Component, Inject, inject, signal } from '@angular/core';
import { Expenses } from '../../core/interfaces/expenses.table.interface';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';
import { MatIconModule } from '@angular/material/icon';
import { ExpensesService } from '../../core/services/expenses_service/expenses.service';
import { ExpensecategoriesService } from '../../core/services/expensecategories_service/expensecategories.service';
import { Router, RouterLink } from '@angular/router';
import { MatOption, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { JwtDecoderService } from '../../core/jwt_decoder/jwt-decoder.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpensePost } from '../../core/interfaces/ExpensesDTO/expensesPost.inteface';
import { IncomesComponent } from '../incomes/incomes.component';

const EXPENSES_DATA: Expenses[] = [
  { id: 1, subcategory: "Mancare", brand: "McDonalds", suma: "50", createdAt: new Date("2020-03-20") },
  { id: 2, subcategory: "Utilitati", brand: "Raja", suma: "120", createdAt: new Date("2020-04-20") },
  { id: 3, subcategory: "Imbracaminte", brand: "Zara", suma: "340", createdAt: new Date("2020-04-24") },
  { id: 4, subcategory: "Masina Personala", brand: "OMV", suma: "250", createdAt: new Date("2020-05-21") },
  { id: 5, subcategory: "Sanatate", brand: "Sensiblu", suma: "120", createdAt: new Date("2020-05-28") }
];

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    AuthnavbarComponent,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {
  readonly dialog = inject(MatDialog);

  constructor(
    private expensesService: ExpensesService,
    private expenseCategoryService: ExpensecategoriesService
  ) { }

  subcategory: string = '';
  brand: string = '';
  suma: string = '';
  createdAt: Date = new Date();
  error: string = '';
  isEdit: boolean = false;

  dialogTitle: string = '';

  displayedColumns: string[] = ["Category", "Amount", "CreatedAt", "Description", "Action"];
  dataSource = EXPENSES_DATA;

  modify(expense: Expenses) {
    const dialogRef = this.dialog.open(AddExpenseDialog, {
      data: expense
    });
  }

  deleteExpense(expenseId: number): void {
    const dialogRef = this.dialog.open(DialogDelete, {
      data: { id: expenseId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        this.dataSource = this.dataSource.filter(expense => expense.id !== expenseId);
      }
    });
  }

  addExpense(): void {
    this.dialog.open(AddExpenseDialog);
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
  expenseCategories: any[] = [];
  categoryId: number = 0;
  selectedCategory: string = '';
  addExpenseForm!: FormGroup;
  expenseToPost!: ExpensePost;
  amount: number = 0;
  description: string = '';
  isEditMode = false;

  constructor(
    private fb: FormBuilder, private expenseCategoryService: ExpensecategoriesService,
    private expenseService: ExpensesService, private jwtDecoder: JwtDecoderService,
    private matSnackBar: MatSnackBar, private router: Router, private dialogRef: MatDialogRef<AddExpenseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Expenses
  ) { }

  ngOnInit() {
    this.getExpenseCategories();
    this.addExpenseForm = this.fb.group({
      amountControl: ['', [Validators.required, Validators.min(1)]],
      descriptionControl: ['', [Validators.maxLength(50)]],
    });

    if (this.data) {
      this.isEditMode = true;
      this.addExpenseForm.patchValue({
        amountControl: this.data.suma,
        descriptionControl: this.data.brand
      });
      this.selectedCategory = this.data.subcategory;
    }

    this.addExpenseForm.get("amountControl")?.valueChanges.subscribe((value: number) => {
      this.addExpenseForm.markAllAsTouched();
      this.amount = value;
    });
    this.addExpenseForm.get("descriptionControl")?.valueChanges.subscribe((value: string) => {
      this.addExpenseForm.markAllAsTouched();
      this.description = value;
    });
  }

  changeClient(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.categoryId = selectedData.value;
    this.selectedCategory = selectedData.text;
    console.log(this.selectedCategory);
  }

  public getExpenseCategories() {
    console.log(this.expenseCategoryService.userId);
    this.expenseCategoryService.getExpenseCategoriesByUser().subscribe({
      next: (response) => this.expenseCategories = response,
      error: (error) => console.log(error)
    });
    console.log(this.expenseCategories);
  }

  postExpense() {
    this.expenseToPost = {
      Amount: Number(this.amount),
      Description: this.description,
      UserId: Number(this.jwtDecoder.userId),
      Expense_CategoryId: this.categoryId,
      CurrencyId: 1
    };
    this.expenseService.postNewExpenseCategory(this.expenseToPost).subscribe({
      next: (response) => {
        const finalResponse = this.matSnackBar.open('The expense was saved', 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
        this.dialogRef.close();
        this.router.navigate(['/expenses']);
      },
      error: (error) => {
        const errorMessage = error?.error?.response || 'The expense was not saved. Please try again';
        this.matSnackBar.open(errorMessage, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }
}

@Component({
  selector: 'dialog-delete',
  templateUrl: './dialog-overview-delete.html',
  styleUrls: ['./dialog-overview-delete.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogContent,
  ],
})
export class DialogDelete {
  constructor(
    private dialogRef: MatDialogRef<DialogDelete>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  confirmDelete(): void {
    this.dialogRef.close('confirmed');
  }

  cancelDelete(): void {
    this.dialogRef.close();
  }
}
