import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incomes } from '../../interfaces/incomes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(
    private http : HttpClient
  ) { }

  public getUserIncomes(id: number) : Observable<Incomes[]> {
    return this.http.get<Incomes[]>(`${environment.baseUrl}${environment.api_incomes_getIncomesByUserId}/${id}`);
  }
}
