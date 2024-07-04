import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ExpenseCategories } from '../../interfaces/ExpenseCategoriesDTO/expense_categories.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpensecategoriesService {

  constructor(private http : HttpClient) { }

  public getExpenseCategoriesByUser(): Observable<any> {
    const params = new HttpParams().set('userId', 1);
    return this.http.get<any>(`${environment.baseUrl}${environment.api_incomeCategories_getIncomeCategories}`, {params})
      .pipe(
        tap(data => console.log('Fetched categories:', data)),
        map(response => response),  // Perform any transformation if needed
        catchError(error => {
          console.error('Error fetching categoriesdodo:', error);
          return throwError(() => new Error('Error fetching categories'));
        })
      );
  }

  public postNewExpenseCategory(expenseCategory: ExpenseCategories): Observable<ExpenseCategories> {
    return this.http.post<ExpenseCategories>(`${environment.baseUrl}${environment.api_expensecategories_post}`, expenseCategory)
      .pipe(
        map((response: ExpenseCategories) => {
          console.log("Fetched data: ", response); 
          return response;
        }),
        catchError((error) => {
            console.log("Error in login API call: ", error);
            return throwError(error);
        })
      )
  }
}
