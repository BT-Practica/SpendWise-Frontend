import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  token = localStorage.getItem('token');
  userId = this.getUserIdFromJwt(this.token);
  constructor() { }


  getUserIdFromJwt(token: any) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;
  }
}
