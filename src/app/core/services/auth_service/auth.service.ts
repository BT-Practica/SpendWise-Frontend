import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { User } from '../../interfaces/user.interface';
import  { jwtDecode } from 'jwt-decode';
import { Login } from '../../interfaces/LoginDTO/login.interface';
import { LoginResponse } from '../../interfaces/LoginDTO/loginresponse.interface';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  constructor(
    private http: HttpClient,
  ) { }

  
  public registerUser(username: string, email: string, password: string): void {
    if(environment.baseUrl == "" && environment.api_register == "") {
      console.error("Environment variables not set yet!");
    }
    
    this.http.post<User>(`${environment.baseUrl}${environment.api_register}`, { username, email, password }).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  } 

  public loginUser(username: string, password: string){

    this.http.post<User>(`${environment.baseUrl}${environment.api_login}`, { username,password}).subscribe({
      next: (res) => {
        console.log("Login works!", res);
      },
      error: (error) => {
        console.log("Something went wrong", error);
      }
    })
  }
  
  public login(login: Login): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.baseUrl}${environment.api_login}`, {login}).pipe(
      map((response) => {
        if(response.isSuccess){
          localStorage.setItem(this.tokenKey, response.token);
        }
        return response;
      })
    );
  }
  

  public getToken() {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return this.tokenNotExpired(token);
  }

  private tokenNotExpired(token: string | null): boolean {
    if (token==null)
      return false;
    const decodeToken: any = jwtDecode(token);
    if (!decodeToken || !decodeToken.exp)
      return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return decodeToken.exp < currentTime;
  }
}


