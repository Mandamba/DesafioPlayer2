import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { LoginI } from './models/login.Interface'
import { ResponseI } from './models/response.interface'
import { AllCompaniesI } from '../app/models/AllCompanies.Interface'
import { cepInput } from '../../src/app/models/cep.enter.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  readonly getCompanyByCep = "https://brasilapi.com.br/api/cep/v2"
  readonly baseUrl="http://localhost:3000/"

  async getCompanyBrasilAPI(data : any){
    return await this.http.get<cepInput>(`${this.getCompanyByCep}/${data}`).toPromise()
  }

  async addCompany(form: any){
    return await this.http.post<ResponseI>(`${this.baseUrl}company`,form).toPromise()
    
  }
  async login(form: LoginI){
    return await this.http.post<ResponseI>(`${this.baseUrl}user/login`,form).toPromise()
  }
  data:any
   async getAllCompanies(){
     
      let auth=localStorage.getItem("token")
      let direction = this.baseUrl + "company"
      return await  this.http.get<AllCompaniesI[]>(direction,{
        headers:{
            Authorization: `Bearer ${auth}`
        }
      }).toPromise()
  }
  async removeCompany(id:any){
     
    let auth=localStorage.getItem("token")
    let direction = this.baseUrl + "company"+"/"+id
    return await  this.http.delete<ResponseI>(direction,{
      headers:{
          Authorization: `Bearer ${auth}`
      }
    }).toPromise()
}
async getCurrentCompany(id:any){
     
  let auth=localStorage.getItem("token")
  let direction = this.baseUrl + "company"+"/"+id
  return await  this.http.get<AllCompaniesI[]>(direction,{
    headers:{
        Authorization: `Bearer ${auth}`
    }
  }).toPromise()
}
async updateCurrentCompany(id:any,form:any){
     
  let auth=localStorage.getItem("token")
  let direction = this.baseUrl + "company"+"/"+id
  return await  this.http.put<ResponseI>(direction,form,{
    headers:{
        Authorization: `Bearer ${auth}`
    }
  }).toPromise()
}


}
