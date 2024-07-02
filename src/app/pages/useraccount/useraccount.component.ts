import { Component, OnInit } from '@angular/core';
import { UseraccountService } from '../../core/services/useraccount-service/useraccount.service';
import { User } from '../../core/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { AuthorizedNavbarComponent } from '../../common/authorized-navbar/authorized-navbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-useraccount',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule, 
    AuthorizedNavbarComponent
  ],
  templateUrl: './useraccount.component.html',
  styleUrl: './useraccount.component.scss'
})
export class UseraccountComponent implements OnInit {
  options: string[] = ['USD', 'EUR', 'RON'];
  filteredOptions: Observable<string[]> = new Observable();
  form: FormGroup;
  user: User | undefined; 

  constructor(
    private userAccountService: UseraccountService,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      username: new FormControl({ value: '', disabled: false }),
      email: new FormControl({ value: '', disabled: false }),
      currency: new FormControl(''),
      createdAt: new FormControl('')
    });
  }

  ngOnInit() {
    this.filteredOptions = this.form.get('currency')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    // Extract the ID from the URL and load user data
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        this.loadData(id);
      } else {
        console.error('ID parameter not found');
      }
    });
  }

  loadData(id: number): void {
    this.userAccountService.getUserById(id).subscribe({
      next: (data) => {
        if (data) {
          this.user = data;
          this.form.controls['username'].setValue(data.username);
          this.form.controls['email'].setValue(data.email);
          this.form.controls['currency'].setValue(data.currency);
          this.form.controls['createdAt'].setValue(  data.createdAt.getDate() + '-' + (data.createdAt.getMonth() + 1) + '-' + data.createdAt.getFullYear());
        } else {
          console.error('User data not found');
        }
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  get isFormPristine(): boolean {
    return this.form.pristine;
  }
}