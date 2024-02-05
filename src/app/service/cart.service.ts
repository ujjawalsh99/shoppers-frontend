// import the necessary modules and packages
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/// <summary>
/// CartService
///</summary>
export class CartService {
  /// <summary>
  /// constructor
  /// </summary>
  constructor(private http: HttpClient) {}

  /// <summary>
  /// Method Name -- getCartData() -- POST REQUEST
  /// Used for getting the cart data based on user email ID.
  /// <param name="userId">User Email ID</param>
  /// <response code="250">Successfully recieved all the cart details of the user</response>
  /// <response code="255">No Result Found;</response>
  /// </summary>
  getCartData(userId: string): Observable<any> {
    return this.http.post<any>(
      `https://shoppers-backend-production.up.railway.app/user/getInCart`,
      {
        userId,
      }
    );
  }

  /// <summary>
  /// Method Name -- order() -- POST REQUEST
  /// Used for sending placed order data to the database.
  /// <param name="orderObj">Order </param>
  /// <response code="250">Order placed successfully</response>
  /// <response code="255">No Order palced;</response>
  /// </summary>
  order(orderObj: Object): Observable<any> {
    return this.http.post<any>(
      `https://shoppers-backend-production.up.railway.app/user/order`,
      orderObj
    );
  }
}
