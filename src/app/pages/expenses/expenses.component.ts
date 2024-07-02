import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Expenses } from '../../core/interfaces/expenses.table.interface';
import {MatTableModule} from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogDataExpenses } from '../../core/interfaces/expenses.dialog.interface';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';

const EXPENSES_DATA : Expenses[] = [
  {id: 1, category: "Cheltuieli", subcategory: "Mancare", brand: "McDonalds", suma: "50", createdAt: new Date("20-03-2020")}, 
  {id: 2, category: "Cheltuieli", subcategory: "Utilitati", brand: "Raja", suma: "120", createdAt: new Date("20-04-2020")}, 
  {id: 3, category: "Cheltuieli", subcategory: "Imbracaminte", brand: "Zara", suma: "340", createdAt: new Date("24-04-2020")}, 
  {id: 4, category: "Cheltuieli", subcategory: "Masina Personala", brand: "OMV", suma: "250", createdAt: new Date("21-05-2020")}, 
  {id: 5,category: "Cheltuieli", subcategory: "Sanatate", brand: "Sensiblu", suma: "120", createdAt: new Date("28-05-2020")}
];
@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [MatTableModule, MatInputModule, FormsModule, MatButtonModule, MatFormFieldModule, AuthnavbarComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  readonly dialog = inject(MatDialog);

  category: string = '';
  subcategory: string = '';
  brand: string = '';
  suma: string = '';
  createdAt: Date = new Date();

  isEdit: boolean = false;
  
  displayedColumns: string[] = ["category", "subcategory", "brand", "suma", "createdAt", "action"]; 
  dataSource = EXPENSES_DATA;

  modify() {
    this.isEdit = true;
    this.dialogTitle = "Modifica cheltuiala";
    this.dialog.open(DialogOverview, {
      data: {category: this.category, subcategory: this.subcategory, brand: this.brand, suma: this.suma}
    });
  }

  dialogTitle: string = "";

  addExpense() : void {
    this.isEdit = false;
    this.dialogTitle = "Adauga cheltuiala";
    const dialogRef = this.dialog.open(DialogOverview, {
      data: {category: this.category, subcategory: this.subcategory, brand: this.brand, suma: this.suma}
    }); 

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed!");
    })
  }
}

@Component({
  selector: 'dialog-overview-example-dialog', 
  templateUrl: 'dialog-overview.html', 
  styleUrl: 'dialog-overview.scss',
  standalone: true, 
  imports: [
    MatFormFieldModule,
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions,
    MatDialogClose
  ],
})

export class DialogOverview {
  readonly dialogRef = inject(MatDialogRef<DialogOverview>); 
  readonly data = inject<DialogDataExpenses>(MAT_DIALOG_DATA);
  
  dialogTitle: string = "";
  category: string = '';
  subcategory: string = '';
  brand: string = '';
  suma: string = '';

  onNoClick() : void {
    this.dialogRef.close();
  }
}