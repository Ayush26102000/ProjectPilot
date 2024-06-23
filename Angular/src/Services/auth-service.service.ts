import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:7192/api/User";

  constructor(private http: HttpClient) { }

  login(username: string, passwordHash: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/LoginUser", { username, passwordHash });
  }

  encryptPassword(password: string): string {
    const encryptedPassword = CryptoJS.AES.encrypt(password, "B@|@j!").toString();
    return encryptedPassword;
  }
}
