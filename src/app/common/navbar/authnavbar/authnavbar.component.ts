import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth_service/auth.service';
import { UserDetailsService } from '../../../core/services/userdetails_service/user-details.service';
import { User } from '../../../core/interfaces/user.interface';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
incomeDialog() {
throw new Error('Method not implemented.');
}
}
