// import the necessary modules and packages
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/// <summary>
/// AuthService
///</summary>
export class AuthService {
  /// <summary>
  /// constructor
  /// </summary>
  constructor() {}

  /// <summary>
  /// Method Name -- isLoggedIn()
  /// Used for returning session storage
  /// <response>Boolean Value</response>
  /// </summary>
  isLoggedIn() {
    return sessionStorage.userId !== undefined;
  }
}
