import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
<<<<<<< HEAD
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth_service/auth.service';
import { UserDetailsService } from '../../../core/services/userdetails_service/user-details.service';
import { User } from '../../../core/interfaces/user.interface';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
=======
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { ExpensesComponent } from '../../../pages/expenses/expenses.component';
import { IncomesComponent } from '../../../pages/incomes/incomes.component';
import { SavingsComponent } from '../../../pages/savings/savings.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
>>>>>>> 9507982038e84bb0646c722b73e6a5729b0f9e2b

@Component({
  selector: 'app-authnavbar',
  standalone: true,
  imports: [MatDialogModule, RouterLink, CommonModule],
  templateUrl: './authnavbar.component.html',
  styleUrls: ['./authnavbar.component.scss']
})
export class AuthnavbarComponent implements OnInit {
  profilePhoto: string = "../../../../assets/profile-user.png";
  checkIfIsLogged: boolean;
  userId!: string;
  userData: User | undefined;

  constructor(
    private dialog: MatDialog,
    private userDetailsService: UserDetailsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.checkIfIsLogged = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['userId']) {
        this.userId = params['userId'];
        this.getUserData(parseInt(this.userId)).subscribe(
          (user?: User) => {
            this.userData = user;
            console.log('User data:', this.userData);
          },
          error => {
            console.error('Error fetching user data', error);
          }
        );
      } else {
        console.error('No userId found in route parameters.');
      }
    });
  }

  getUserData(id: number): Observable<User | undefined> {
    return this.userDetailsService.getUserById(id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NavbarDialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  signOut() {
    this.authService.signOut();
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
}

@Component({
  selector: 'income-dialog-content',
  templateUrl: './income-dialog.content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ExpensesComponent, IncomesComponent, SavingsComponent, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule],
})
export class IncomeDialogContent{
  constructor(private dialogRef: MatDialogRef<AuthnavbarComponent>){}
  closeDialog(): void{
    this.dialogRef.componentInstance.dialog.open(NavbarDialogContent);
  }
}



