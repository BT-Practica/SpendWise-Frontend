import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environment';
import { AddIncome } from '../../interfaces/IncomeDTO/AddIncome';
import { ExtractIncomeCategories } from '../../interfaces/IncomeCategoriesDTO/extractincomecategories.interface';
import { JwtDecoderService } from '../../jwt_decoder/jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(
    private http : HttpClient, private jwtDecoder: JwtDecoderService
  ) { }

  userId = this.jwtDecoder.userId;

  public postIncomeService(incomeObject: AddIncome) : Observable<AddIncome>{
    return this.http.post<AddIncome>(`${environment.baseUrl}${environment.api_incomes_createIncome}`, incomeObject).pipe(
      map((response: AddIncome) => {
        console.log("Fetched data: ", response); 
        return response;
      }),
      catchError((error) => {
          console.log("Error in login API call: ", error);
          return throwError(error);
      })
    )
  }

  public getIncomeCategoriesByUser(): Observable<any> {
    const params = new HttpParams().set('userId', this.userId);
    return this.http.get<any>(`${environment.baseUrl}${environment.api_incomeCategories_getIncomeCategories}`, {params})
      .pipe(
        tap(data => console.log('Fetched categories:', data)),
        map(response => response),  
        catchError(error => {
          console.error('Error fetching categoriesdodo:', error);
          return throwError(() => new Error('Error fetching categories'));
        })
      );
  }


  // public getUserIncomes(id: number) : Observable<Incomes[]> {
  //   const url = `${environment.baseUrl}${environment.api_incomes_getIncomesByUserId}/${id}`;
  //   return this.http.get<Incomes[]>(url);
  // }

  // public addIncome(description: string, reccurrence: boolean, incomeCategory: string, amount: number): Observable<AddIncome> {
  //   const url = `${environment.baseUrl}${environment.api_incomes_addIncome}`;
  //   return this.http.post<AddIncome>(url, { description, reccurrence, incomeCategory, amount });
  // }

  // public updateIncome(description: string, reccurence: boolean, income_category: string, amount: number) : Observable<AddIncome> {
  //   const url = `${environment.baseUrl}${environment.api_incomes_put}`
  //   return this.http.put<AddIncome>(`${environment.baseUrl}${environment.api_incomes_put}`, {description, reccurence, income_category, amount});
  // }

  // public deleteIncome(id: number) : Observable<Income> {
  //   const url = `${environment.baseUrl}${environment.api_incomes_delete}/${id}`;
  //   return this.http.delete<Income>(`${environment.baseUrl}${environment.api_incomes_delete}/${id}`);
  // }
  
}
