import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Incomes } from '../../core/interfaces/incomes.interface';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { DialogIncomesComponent } from './dialog-incomes/dialog-incomes.component';

const INCOMES_DATA: Incomes[] = [
  { registrationDate: new Date("2022-01-01"), description: "Salary", reccurence: true, amount: 5000, income_category: "Employment", incomeCategoryId: 1 },
  { registrationDate: new Date("2022-01-01"), description: "Freelance Payment", reccurence: false, amount: 1000, income_category: "Self-Employed", incomeCategoryId: 2 },
  { registrationDate: new Date("2022-01-01"), description: "Bonus", reccurence: false, amount: 2000, income_category: "Other", incomeCategoryId: 3 },
  { registrationDate: new Date("2022-01-01"), description: "Investment Return", reccurence: true, amount: 300, income_category: "Investment", incomeCategoryId: 4 },
  { registrationDate: new Date("2022-01-01"), description: "Rental Income", reccurence: true, amount: 1500, income_category: "Real Estate", incomeCategoryId: 5 }
];

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogContent, 
    MatDialogTitle
  ],
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomesComponent {
  readonly dialog = inject(MatDialog);

  registrationDate: Date = new Date();
  description: string = '';
  reccurence: boolean = false;
  amount: number = 0;
  income_category: string = '';
  incomeCategoryId: number = 0;

  categories: string[] = [
    "Salary",
    "",
    "Other",
    "Investment",
    "Real Estate"
  ];

  isEdit: boolean = false;

  displayedColumns: string[] = ["registrationDate", "description", "amount", "income_category"];
  dataSource = INCOMES_DATA;

  modify() {
    // Implement modify functionality
  }

  dialogTitle: string = "";

  addIncome(): void {
    const dialogRef = this.dialog.open(DialogIncomesComponent, {
      data: {
        category: this.income_category,
        subcategory: this.income_category,
        brand: this.income_category,
        suma: this.income_category
      }
    })
  }
}