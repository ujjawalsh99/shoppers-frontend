import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { User, Credentials } from './user';
import { UriService } from '../uri.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  shoppersWebServiceUrl: string;
  constructor(private http: HttpClient, private uriService: UriService) {
    this.shoppersWebServiceUrl = this.uriService.buildShoppersWebServiceUri();
  }

  login(userCredential: Credentials): Observable<any> {
    return this.http.post(
      'http://localhost:3000/user/login',
      userCredential
    ) as Observable<any>;
  }

  logout(): Observable<User> {
    return this.http.get(
      this.shoppersWebServiceUrl + 'logout'
    ) as Observable<User>;
  }

  getUserDetail(uEmail: string): Observable<User> {
    return this.http.get(this.shoppersWebServiceUrl + 'userDetail', {
      params: { uEmail },
    }) as Observable<User>;
  }

  registerUser(newUser: User): Observable<User> {
    return this.http.post(
      this.shoppersWebServiceUrl + 'register',
      newUser
    ) as Observable<User>;
  }
}
