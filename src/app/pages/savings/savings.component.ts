import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogOverview } from '../expenses/expenses.component';

@Component({  
  selector: 'app-savings',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss'
})
export class SavingsComponent {

  constructor(private dialog: MatDialog) {}

  openStergeDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(SavingsExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Sterge dialog result: ${result}`);
    });
  }

  openEditareDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(SavigsEditareExempleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Editare dialog result: ${result}`);
    });
  }
}

@Component({  
  selector: 'app-savings-example-dialog',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogClose],
  templateUrl: './dialog.savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsExampleDialogComponent {
  constructor(public dialogRef: MatDialogRef<SavingsExampleDialogComponent>) {}

}

@Component({
  selector: 'app-editare-savings-example-dialog',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogClose, FormsModule],
  templateUrl: './dialog.editare.savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavigsEditareExempleDialogComponent{
  constructor(public dialogRef: MatDialogRef<SavigsEditareExempleDialogComponent>) {}

  nume_obiectiv!: string
  suma_tinita!: number
  suma_economisita!: number
  procentaj_completare!: number

  onSubmit(){
    
  }
}