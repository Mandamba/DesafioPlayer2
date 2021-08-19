import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AllCompaniesI } from '../models/AllCompanies.Interface'
import { cepInput } from '../models/cep.enter.interface';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  constructor(private http : AuthServiceService, private router: ActivatedRoute, private redirectRout: Router) { }
  
  updateForm = new FormGroup({
    cep: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    neighborhood: new FormControl('', Validators.required),
    service : new FormControl('', Validators.required)
  })
 company:any
 companyResult:any
 async ngOnInit() {
   try{
    this.company=   await this.http.getCurrentCompany(this.router.snapshot.params.id)
    this.updateForm=new FormGroup({
     cep: new FormControl(this.company["cep"]),
     state: new FormControl(this.company["state"]),
     city: new FormControl(this.company["city"]),
     street: new FormControl(this.company["street"]),
     neighborhood: new FormControl(this.company["neighborhood"]),
     service : new FormControl(this.company["service"])
   })
   }
   catch(ex)
   {
     alert(ex.error.errors[0].message)
   }
  }
  async updateCompany(form: cepInput)
  {
    try
    {
      let result= this.companyResult= await this.http.updateCurrentCompany(this.router.snapshot.params.id,form)
      alert(result.message)
      this.redirectRout.navigate(['companylist'])
    }
    catch(ex)
    {
      alert(ex.error.errors[0].message)
    }
      
    }
}
