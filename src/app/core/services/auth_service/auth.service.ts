import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { User } from '../../interfaces/user.interface';
import  { jwtDecode } from 'jwt-decode';
import { Login } from '../../interfaces/LoginDTO/login.interface';
import { LoginResponse } from '../../interfaces/LoginDTO/loginresponse.interface';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Route, Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  constructor(private http: HttpClient, private router: Router, private matSnackBar: MatSnackBar) { }

  
  public registerUser(username: string, email: string, password: string): void {
    if(environment.baseUrl == "" && environment.api_register == "") {
      console.error("Environment variables not set yet!");
    }
    this.http.post<User>(`${environment.baseUrl}${environment.api_register}`, { username, email, password }).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        this.matSnackBar.open("You are registered, please enter your credentials", 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        // this.router.navigate(['/login'])
      }
    });
  } 
  
  public login(login: Login): Observable<string> {
    return this.http.post(`${environment.baseUrl}${environment.api_login}`, login, { responseType: 'text', observe: 'response' })
        .pipe(
            map((response: HttpResponse<string>) => {
                console.log("Raw Response: ", response); 
                return response.body as string;
            }),
            tap((response: string) => {
                console.log("Parsed Response API: ", response);
                localStorage.setItem("token", response);
            }),
            catchError((error) => {
                console.log("Error in login API call: ", error);
                return throwError(error);
            })
        );
  }
  

  public getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return this.tokenNotExpired(token);
  }

  private tokenNotExpired(token: string | null): boolean {
    if (token == null) {
      return false;
    }

    try {
      const decodeToken: any = jwtDecode(token);
      if (!decodeToken || !decodeToken.exp) {
        return false;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decodeToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
}


