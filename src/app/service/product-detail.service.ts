// import the necessary modules and packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/// <summary>
/// ProductDetailService
///</summary>
export class ProductDetailService {
  /// <summary>
  /// constructor
  /// </summary>
  constructor(private http: HttpClient) {}

  /// <summary>
  /// Method Name -- getProductDetailData() -- GET REQUEST
  /// Used for getting all the products available
  /// <param name="prodId">prodId</param>
  /// <response code="250">Get all the product details</response>
  /// <response code="255">Reason - No Result Found;</response>
  /// </summary>
  getProductDetailData(prodId: string): Observable<any> {
    return this.http.get<any>(`https://shoppers-backend.onrender.com/product/id/${prodId}`);
  }

  /// <summary>
  /// Method Name -- postProductDetailData() -- POST REQUEST
  /// Used for sending the add to cart product to database.
  /// <param name="prodObj">prodObj</param>
  /// <response code="250">Cart data added successfully</response>
  /// <response code="255">Reason - Error;</response>
  /// </summary>
  postProductDetailData(prodObj: object): Observable<any> {
    return this.http.post<any>(
      'https://shoppers-backend.onrender.com/user/addToCart/',
      prodObj
    );
  }
}
