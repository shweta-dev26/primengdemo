import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url } from 'url';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {
  
  
  constructor(private http:HttpClient){

  }

  private baseUrl:'https://api.restful-api.dev/objects'

  getdata():Observable<any[]>{
   return this.http.get<any[]>(this.baseUrl);
  }
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>('https://api.restful-api.dev/objects');
  }



  getproduct():Observable<{products: any[]}>{
  return this.http.get<{products: any[]}>('https://dummyjson.com/products');
  }
}
