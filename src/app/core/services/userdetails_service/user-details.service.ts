import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})

export class UserDetailsService {
  private users: User[] = [
    {
      id: 1,
      username: 'john doe',
      email: 'johndoe@email.com',
      password: 'johndoe',
      createdAt: new Date('2024-02-21'),
      currency: 'USD',
            token: ""
    },
    {
      id: 2,
      username: 'jane doe',
      email: 'janedoe@email.com',
      password: 'janedoe',
      createdAt: new Date('2024-02-22'),
      currency: 'EUR',
            token: ""
    },
    {
      id: 3,
      username: 'joe doe',
      email: 'joedoe@email.com',
      password: 'joedoe',
      createdAt: new Date('2024-02-23'),
      currency: 'RON',
            token: ""
    },
    {
      id: 4,
      username: 'jim doe',
      email: 'jimdoe@email.com',
      password: 'jimdoe',
      createdAt: new Date('2024-02-20'),
      currency: 'GBP',
      token: ""
    }
  ];

  //in productie, adauga dependency injection pentru HttpClient
  constructor(private http: HttpClient) { }

  public getAllUsers(): User[] {
    // in productie adauga in loc de : User[] -> Observable<User[]> si decomenteaza return this.http...
    // return this.http.get<User[]>(`${environment.baseUrl}${environment.api_getAllUsers}`);

    return this.users;
  }

  public getUserById(id: number): Observable<User | undefined> {

    // Scoateti comentarile de mai jos la apelul userFound, daca vrei sa folosesti o metoda HTTP cu un endpoint real!
    // const userFound = this.http.get<User>(`${environment.baseUrl}${environment.api_getUserData}`, {params: {id :id.toString()}});
    // return userFound;

    // const user = this.users.find(user => user.id === id);
    return this.http.get<User>(`${environment.baseUrl}${environment.api_getUserData}`, {params: {userId: id.toString()}});
  }

  public getUserByNameId(nameId: string): Observable<User | undefined> {
    return this.http.get<User>(`${environment.baseUrl}${environment.api_getUserData}`, {params: {nameid: nameId}});
  }
}
