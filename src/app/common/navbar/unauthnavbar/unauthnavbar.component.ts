import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button'
@Component({
  selector: 'app-unauthnavbar',
  standalone: true,
  imports: [MatIconButton, RouterLink],
  templateUrl: './unauthnavbar.component.html',
  styleUrl: './unauthnavbar.component.scss'
})
export class UnauthnavbarComponent {

}
