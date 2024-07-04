import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Expenses } from '../../interfaces/expenses.table.interface';
import { environment } from '../../environment';
import { ExpensePost } from '../../interfaces/ExpensesDTO/expensesPost.inteface';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public postNewExpenseCategory(expensePost: ExpensePost): Observable<ExpensePost> {
    return this.http.post<ExpensePost>(`${environment.baseUrl}${environment.api_expensecategories_post}`, expensePost)
      .pipe(
        map((response: ExpensePost) => {
          console.log("Fetched data: ", response); 
          return response;
        }),
        catchError((error) => {
            console.log("Error in login API call: ", error);
            return throwError(error);
        }),
      )
  }
}