import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { cepInput } from '../models/cep.enter.interface'
@Component({
  selector: 'app-cep-component',
  templateUrl: './cep-component.component.html',
  styleUrls: ['./cep-component.component.css']
})
export class CepComponentComponent implements OnInit {

  addCompany = new FormGroup({
    cep: new FormControl('', Validators.required)
  })
  empresa: any
  config: cepInput | undefined;
  constructor(private cepCompany: AuthServiceService, private router : Router) { }
  errorMsg: any = ""
  ngOnInit(): void {
    this.empresa = {}
  }
  async getCompany(data: any = this.addCompany.value.cep) {
    try {
      let result = await this.cepCompany.getCompanyBrasilAPI(data)
      let resp = await this.cepCompany.addCompany(result)
      if (resp.companies) {
        alert(resp.message)
        window.location.reload()
      }
      else {
        alert(resp.message)
       
      }
    }
    catch(ex)
    {
      alert(ex.error.errors[0].message)
    }

    return

  }

}
