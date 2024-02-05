// import the necessary modules and packages
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/// <summary>
/// DashboardService
///</summary>
export class DashboardService {
  /// <summary>
  /// constructor
  /// </summary>
  constructor(private http: HttpClient) {}

  /// <summary>
  /// Method Name -- getProductData() -- GET REQUEST
  /// Used for getting all the available products based on categories
  /// <param name="category">category</param>
  /// <response code="250">Return all the products available</response>
  /// <response code="255">Reason - No Result Found;</response>
  /// </summary>
  getProductData(category: string): Observable<any> {
    return this.http.get<any>(
      `https://shoppers-backend-production.up.railway.app/product/category/${category}`
    );
  }
}
