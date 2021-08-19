import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service'
import { LoginI } from '../models/login.Interface';
import { ResponseI } from '../models/response.interface'
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private api : AuthServiceService, private router: Router) { }
  errorStatus : boolean = false
  errorMsg : any = ""
  ngOnInit(): void {
  }

 async onLogin(form: LoginI){
  let result = await this.api.login(form)
      if (result.token){
        localStorage.setItem("token", result.token)

        this.router.navigate(['companylist'])
      }
      else{
        this.errorMsg = result.message
      }
    }

}
