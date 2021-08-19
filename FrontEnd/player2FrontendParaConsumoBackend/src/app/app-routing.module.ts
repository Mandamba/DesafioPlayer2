import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CepComponentComponent } from './cep-component/cep-component.component'
import { AllCompaniesComponent } from './all-companies/all-companies.component'
import { CompanyEditComponent } from './company-edit/company-edit.component'
const routes: Routes = [
  {
    path: '',redirectTo:'login', pathMatch:'full'},
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'companylist',
    component: AllCompaniesComponent
  },
  {
    path:'edit/:id',
    component: CompanyEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = { LoginComponent, AllCompaniesComponent }
