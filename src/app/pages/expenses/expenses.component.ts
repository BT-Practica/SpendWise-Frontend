import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Expenses } from '../../core/interfaces/expenses.table.interface';
import {MatTableModule} from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogDataExpenses } from '../../core/interfaces/expenses.dialog.interface';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import { ExpensesService } from '../../core/services/expenses_service/expenses.service';

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
    private expensesService: ExpensesService
  ) { }

  subcategory: string = '';
  brand: string = '';
  suma: string = '';
  createdAt: Date = new Date();
  error: string = '';
  isEdit: boolean = false;

  dialogTitle: string = '';
  
  displayedColumns: string[] = ["subcategory", "brand", "suma", "createdAt", "action"]; 
  dataSource = EXPENSES_DATA;

  modify() {
    this.isEdit = true;
    this.dialogTitle = "Modifica cheltuiala";
    this.dialog.open(DialogOverview, {
      data: {subcategory: this.subcategory, brand: this.brand, suma: this.suma}
    });

    //TODO: get data from button clicked and add it to dialog's fields
    //TODO: make request to delete from db
  }

  deleteExpense() : void { 
    this.isEdit = false; 
    const dialogRef = this.dialog.open(DialogDelete, {
      
    });
  }

  addExpense() : void {
    this.isEdit = false;
    this.dialogTitle = "Adauga cheltuiala";
    const dialogRef = this.dialog.open(DialogOverview, {
      data: { subcategory: this.subcategory, brand: this.brand, suma: this.suma}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed!");
    })

    if(!this.subcategory || !this.brand || !this.suma) {
      this.error = "Toate campurile sunt obligatorii!";
    } else if (parseInt(this.suma) < 0) {
      this.error = "Suma nu poate fi negativa!";
    } else { 

      let category: string = 'Cheltuiala';
      let createdAt: Date = new Date();
      this.expensesService.addExpense(category, this.subcategory, this.brand, this.suma, createdAt).subscribe();
    }
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
    MatDialogClose,
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