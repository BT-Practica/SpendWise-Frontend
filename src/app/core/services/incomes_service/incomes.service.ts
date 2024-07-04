import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incomes } from '../../interfaces/incomes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Income } from '../../interfaces/income.interface';
import { AddIncome } from '../../interfaces/IncomeDTO/AddIncome';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(
    private http : HttpClient
  ) { }

  public getUserIncomes(id: number) : Observable<Incomes[]> {
    const url = `${environment.baseUrl}${environment.api_incomes_getIncomesByUserId}/${id}`;
    return this.http.get<Incomes[]>(url);
  }

  public addIncome(description: string, reccurrence: boolean, incomeCategory: string, amount: number): Observable<AddIncome> {
    const url = `${environment.baseUrl}${environment.api_incomes_addIncome}`;
    return this.http.post<AddIncome>(url, { description, reccurrence, incomeCategory, amount });
  }

  public updateIncome(description: string, reccurence: boolean, income_category: string, amount: number) : Observable<AddIncome> {
    const url = `${environment.baseUrl}${environment.api_incomes_put}`
    return this.http.put<AddIncome>(`${environment.baseUrl}${environment.api_incomes_put}`, {description, reccurence, income_category, amount});
  }

  public deleteIncome(id: number) : Observable<Income> {
    const url = `${environment.baseUrl}${environment.api_incomes_delete}/${id}`;
    return this.http.delete<Income>(`${environment.baseUrl}${environment.api_incomes_delete}/${id}`);
  }
}
