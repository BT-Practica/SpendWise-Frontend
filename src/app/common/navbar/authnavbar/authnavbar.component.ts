import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { ExpensesComponent } from '../../../pages/expenses/expenses.component';
import { IncomesComponent } from '../../../pages/incomes/incomes.component';
import { SavingsComponent } from '../../../pages/savings/savings.component';
import { AuthService } from '../../../core/services/auth_service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authnavbar',
  standalone: true,
  imports: [MatDialogModule, RouterLink, CommonModule],
  templateUrl: './authnavbar.component.html',
  styleUrl: './authnavbar.component.scss'
})
export class AuthnavbarComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(NavbarDialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  profilePhoto :string = "../../../../assets/profile-user.png"
  authService = inject(AuthService);  
  checkIfIsLogged = this.authService.isAuthenticated();
  signOut = this.authService.signOut;
}

@Component({
  selector: 'navbar-dialog-content',
  templateUrl: './navbar-dialog.content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ExpensesComponent, IncomesComponent, SavingsComponent, RouterLink],
})
export class NavbarDialogContent {}
