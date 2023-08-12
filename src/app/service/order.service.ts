// import the necessary modules and packages
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/// <summary>
/// OrderService
///</summary>
export class OrderService {
  /// <summary>
  /// constructor
  /// </summary>
  constructor(private http: HttpClient) {}

  /// <summary>
  /// Method Name -- getOrder() -- POST REQUEST
  /// Used for getting the order details of the user
  /// <param name="userId">userId</param>
  /// <response code="250">Return all the order details of the user</response>
  /// <response code="255">Reason - No Result Found;</response>
  /// </summary>
  getOrder(userId: string): Observable<any> {
    return this.http.post<any>(`https://shoppers-backend.onrender.com/user/getOrders`, {
      userId,
    });
  }
}
