import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service'
import { AllCompaniesI } from '../models/AllCompanies.Interface'
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent implements OnInit {
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  
   constructor( private api : AuthServiceService, private router: Router) {
   
  }

  logout(){
    localStorage.removeItem("token")
    this.router.navigate(['login'])
  }
 
  empresas : any 
 async  ngOnInit() {
   try
   {
     this.empresas= await this.api.getAllCompanies()
     
   }
   catch(ex)
   {
     alert(ex.error.errors[0].message)
   }
  }

 async delete(id:any){
   try
   {
    let result=  await this.api.removeCompany(id)
    alert(result.message)
      window.location.reload()
   }
   catch(ex)
   {
    alert(ex.error.errors[0].message)
   }
  
  }

}
