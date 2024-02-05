// import the necessary modules and packages
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/// <summary>
/// SearchProductService
///</summary>
export class SearchProductService {
  /// <summary>
  /// constructor
  /// </summary>
  constructor(private http: HttpClient) {}

  /// <summary>
  /// Method Name -- getSearchData() -- GET REQUEST
  /// Used for getting the data based on search inputs
  /// <param name="productName">productName</param>
  /// <response code="250">Return all the products based on the search Input</response>
  /// <response code="255">Reason - No Result Found;</response>
  /// </summary>
  getSearchData(productName: string): Observable<any> {
    return this.http.get<any>(
      `https://shoppers-backend-production.up.railway.app/product/search/${productName}`
    );
  }
}
