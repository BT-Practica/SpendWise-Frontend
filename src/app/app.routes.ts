import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { IncomesComponent } from './pages/incomes/incomes.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UserAccountComponent } from './pages/useraccount/useraccount.component';
import { AuthguardService } from './core/guards/auth_guard/authguard.service';

export const routes: Routes = [
    { path: 'register',  loadComponent: () => { 
        return import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
        );   
    } },
    { path: 'login', loadComponent: () => { 
        return import('./pages/login/login.component').then(
            (m) => m.LoginComponent
        );   
    } },
    { path: "", loadComponent: () => { 
        return import('./pages/home/home.component').then(
            (m) => m.HomeComponent
        );   
    }, 
        canActivate: [AuthguardService]
    },
    { 
        path: 'useraccount/:userId', loadComponent: () => { 
            return import('./pages/useraccount/useraccount.component').then(
                (m) => m.UserAccountComponent
            )  
        }, 
        canActivate: [AuthguardService]
    },
    { path: "expenses", loadComponent: () => { 
        return import('./pages/expenses/expenses.component').then(
            (m) => m.ExpensesComponent
        );   
    } },
    { path: "savings", loadComponent: () => { 
        return import('./pages/savings/savings.component').then(
            (m) => m.SavingsComponent
        );   
    } },
    { path: "incomes", 
        loadComponent: () => { 
            return import('./pages/incomes/incomes.component').then(
                (m) => m.IncomesComponent
            );   
        } 
    }, 
    {
        path: "tips",
        loadComponent: () => {
            return import ('./pages/tips-savings/tips-savings.component').then(
                (m) => m.TipsSavingsComponent
            )
        }
    },
    {
        path:"forgotpassword",
        loadComponent:()=>{
            return import('./pages/forgotpassword/forgotpassword.component').then(
                (m) => m.ForgotpasswordComponent
            )
        }
    },
    {
        path: 'tip/:id', 
        loadComponent : () => {
            return import("./pages/tipdetail/tipdetail.component").then(
                (m) => m.TipdetailComponent
            )
        },
        canActivate: [AuthguardService]
    },
    {
        path:"resetpassword",
        loadComponent:()=>{
            return import('./pages/resetpassword/resetpassword.component').then(
                (m) => m.ResetpasswordComponent
            )
        }
        // de implementat guard route pentru resetpassword!! user ul nu poate accesa path-ul cu resetpassword
    },
    // {
    //     path: "userprofile",
    //     loadComponent:()=>{
    //         return import("./pages/user-profile/user-profile.component").then(
    //             (m) => m.UserProfileComponent
    //         )
    //     }
    // }
];