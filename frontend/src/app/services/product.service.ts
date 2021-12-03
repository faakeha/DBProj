import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpParams, HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL

  constructor(private http: HttpClient) { }

  //connect frontend to backend
  apiUrlcustomer = 'http://localhost:3000/getcustomer';
  apiUrladdress = 'http://localhost:3000/getaddress';
  apiUrlorders = 'http://localhost:3000/getorders';
  apiUrlbrand = 'http://localhost:3000/getbrand';
  apiUrlbrandproduct = 'http://localhost:3000/getbrand_product';
  apiUrlcart = 'http://localhost:3000/getcart';
  apiUrltracker = 'http://localhost:3000/gettracker';
  apiUrlreview = 'http://localhost:3000/getreview';
  apiUrlproduct = 'http://localhost:3000/getproduct';
  apiUrlcategory = 'http://localhost:3000/getcategory';

  //insert data
  insertData(data:any): Observable<any>{
    console.log(data, 'createapi=>');
    return this.http.post(`${this.apiUrlcustomer}`, data);
  }

  //get all data
  getAllProducts(): Observable<any>{
    return this.http.get(`${this.apiUrlproduct}`);
  }


  
  //get single data
  getSingleData(email:any, pass:any):Observable<any>{
    console.log('createapi=>', email, pass);
    //let em = data;
    let params = new HttpParams()
    .set('Email', email)
    .set('Pass', pass);

    console.log("params:", params.get('Email'));

    return this.http.get(`${this.apiUrlcustomer}/${email}/${pass}`);
  }

  



 
}
