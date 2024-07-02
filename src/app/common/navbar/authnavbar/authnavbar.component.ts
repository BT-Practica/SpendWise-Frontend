import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-authnavbar',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './authnavbar.component.html',
  styleUrl: './authnavbar.component.scss'
})
export class AuthnavbarComponent {

}

