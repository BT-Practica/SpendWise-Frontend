import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    AuthnavbarComponent
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


  

}