import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

   apiUrl = "https://localhost:7192/api/User/";

  constructor(private http: HttpClient) { }

  addUser(userData: User): Observable<any> {
    return this.http.post<any>(this.apiUrl + "AddUser", userData);
  }

  GetUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl );
  }

  
}
