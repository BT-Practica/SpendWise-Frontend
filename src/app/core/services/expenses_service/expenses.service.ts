import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Expenses } from '../../interfaces/expenses.table.interface';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getExpenses() : Observable<Expenses[]> {
    return this.http.get<Expenses[]>(`${environment.baseUrl}${environment.api_expenses_get}`);
  }

  public getExpensesByUser() : void {
    this.http.get<any>(`${environment.baseUrl}${environment.api_expenses_getByUser}`);
  }

  public addExpense(category: string, subcategory: string, brand: string, suma: string, createdAt: Date): Observable<Partial<Expenses>> {
    return this.http.post<Expenses>(`${environment.baseUrl}${environment.api_expenses_put}`, {subcategory, brand, suma, createdAt});
  }

  public deleteExpense(id: number): Observable<Expenses> {
    return this.http.delete<Expenses>(`${environment.baseUrl}${environment.api_expenses_delete}/${id}`);
  }

}