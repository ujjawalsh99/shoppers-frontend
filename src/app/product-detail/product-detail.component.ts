// import the necessary modules and packages
import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailService } from '../service/product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})

/// <summary>
/// ProductDetailComponent
///</summary>
export class ProductDetailComponent implements OnInit, DoCheck {
  /// <summary>
  /// constructor
  /// </summary>
  constructor(
    private _aRoute: ActivatedRoute,
    private productDetailService: ProductDetailService,
    private router: Router
  ) {}

  /// Class Variables
  public productId: string = '';
  public successMessage: string = '';
  public errorMessage: string = '';
  public productDataDetails: any;
  darkTheme = false;

  /// productDataObj to bind data from backend to frontend
  public productDataObj = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productImage: '',
    productSpecification: '',
    sellerName: '',
    productDiscount: 0,
    productShippingCharge: 0,
    productRating: [],
    productNegativeRating: [],
  };

  /// lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    this.productId = this._aRoute.snapshot.paramMap.get('productId');
    this.getProductDetail(this.productId);
  }

  ngDoCheck() {
    this.darkTheme = sessionStorage.theme === 'dark' ? true : false;
  }

  /// Method to map data from backend to productDataObj
  mappingDataToObject(data) {
    this.productDataObj.productName = data.pName;
    this.productDataObj.productDescription = data.pDescription;
    this.productDataObj.productPrice = data.price;
    this.productDataObj.productImage = data.image;
    this.productDataObj.productSpecification = data.color;
    this.productDataObj.sellerName = data['pSeller']['s_Id'];
    this.productDataObj.productDiscount = data['pSeller']['pDiscount'];
    this.productDataObj.productShippingCharge =
      data['pSeller']['pShippingCharges'];
    this.productDataObj.productRating = [
      ...Array(Math.ceil(data['pRating'])).keys(),
    ];
    this.productDataObj.productNegativeRating = [
      ...Array(5 - Math.ceil(data['pRating'])).keys(),
    ];
  }

  /// Method to fetch all the details of product available based on product ID
  getProductDetail(id: string) {
    this.productDetailService.getProductDetailData(id).subscribe(
      (response) => {
        this.productDataDetails = response.data[0];
        this.mappingDataToObject(this.productDataDetails);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  /// Method to send the product which was added into the cart
  /// objToSend -- Product Object data send to backend
  addToCart(): void {
    const objToSend = {
      userId: sessionStorage.userId,
      productArray: [{ productId: this.productId, productCount: 1 }],
    };
    this.productDetailService
      .postProductDetailData(objToSend)
      .subscribe((success) => {
        this.router.navigate(['/cart']);
      });
  }
}
