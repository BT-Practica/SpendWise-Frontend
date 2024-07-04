import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IncomesService } from '../../../core/services/incomes_service/incomes.service';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-incomes',
  standalone: true,
  imports: [MatDialogModule, MatSnackBarModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatFormField, MatLabel, CommonModule, MatAutocomplete, MatAutocompleteModule, FormsModule, MatInputModule],
  templateUrl: './dialog-incomes.component.html',
  styleUrl: './dialog-incomes.component.scss'
})
export class DialogIncomesComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogIncomesComponent>);

  constructor(
    private incomesService: IncomesService,
    private matSnackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
      
  }

  user : string = 'Razvan';

  registrationDate: Date = new Date();
  description: string = '';
  reccurence: boolean = false;
  amount: number = 0;
  income_category: string = '';
  incomeCategoryId: number = 0;

  error: string = '';

  categories: string[] = [
    "",
    "Salariu",
    "Altceva",
    "Investire",
    "Imobiliare"
  ];

  selectedCategory: string = '';

  onNoClick() : void {
    this.dialogRef.close();
  }

  addIncomes(): void {
    if (!this.description || !this.selectedCategory || !this.amount) {
      this.error = "Toate campurile trebuie sa contina date";
      return;
    } 
    if (this.amount < 0) {
      this.error = "Suma nu poate fi negativa";
      return;
    }
  
    switch (this.selectedCategory) {
      case "Salariu":
        this.incomeCategoryId = 1;
        break;
      case "Altceva":
        this.incomeCategoryId = 2;
        break;
      case "Investire":
        this.incomeCategoryId = 3;
        break;
      case "Imobiliare":
        this.incomeCategoryId = 4;
        break;
      default:
        this.error = "Categorie invalida";
        return;
    }
  
    this.incomesService.addIncome(this.description, this.reccurence, this.income_category, this.amount).subscribe({
      next: (res) => {
          this.matSnackBar.open("Venitul a fost adaugat cu succes", 'Ok', {
              duration: 5000,
              horizontalPosition: 'center',
          });
      },
      error: (err) => {
        console.log(err);
        this.error = "Ceva nu a mers corect! Incercati din nou!";
        this.matSnackBar.open(`${this.error}`, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      }
    });
  }
  
}