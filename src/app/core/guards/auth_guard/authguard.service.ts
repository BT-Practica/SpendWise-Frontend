import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth_service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated())
      return true;
    this.router.navigate(['/login']);
    return false;
  }
}
