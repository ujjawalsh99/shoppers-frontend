// import the necessary modules and packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/// <summary>
/// RegistrationService
///</summary>
export class RegistrationService {
  /// <summary>
  /// constructor
  /// </summary>
  constructor(private http: HttpClient) {}

  /// <summary>
  /// Method Name -- registerUserService() -- POST REQUEST
  /// Used for sending new user data to the database.
  /// <param name="regUser">regUser</param>
  /// <response code="250">Registration Successfully</response>
  /// <response code="255">User already exists;</response>
  /// </summary>
  registerUserService(regUser: any): Observable<any> {
    return this.http.post('http://localhost:3000/user/register', regUser);
  }
}
