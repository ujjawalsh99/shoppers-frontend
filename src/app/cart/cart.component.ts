// import the necessary modules and packages
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { ProductDetailService } from '../service/product-detail.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

/// <summary>
/// CartComponent
///</summary>
export class CartComponent implements OnInit, DoCheck {
  /// Class Variables
  userId: string;
  productData: Array<any>;
  total: number;
  darkTheme = false;

  /// <summary>
  /// constructor
  /// </summary>
  constructor(
    private cartService: CartService,
    private productDetailService: ProductDetailService,
    private router: Router
  ) {}

  /// lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    this.userId = sessionStorage.userId;
    this.getCartData(this.userId);
  }

  // A callback method that performs change-detection, invoked after the default change-detector runs
  ngDoCheck(): void {
    this.darkTheme = sessionStorage.theme === 'dark' ? true : false;
    this.total = this.productData?.reduce(
      (acc, product) =>
        acc +
        product.productCount *
          product.productData.price *
          (1 - product.productData.pSeller.pDiscount),
      0
    );
  }

  /// Method to get all the cart data for the user
  getCartData(userId) {
    this.cartService.getCartData(userId).subscribe((res) => {
      if (!res.error) {
        this.productData = res.data;
      } else {
        this.productData = [];
        console.log('Cart fetch failed');
      }
    });
  }

  /// Method to send the number of products purchased back to backend
  addToCart(quantity, productId): void {
    const objToSend = {
      userId: sessionStorage.userId,
      productArray: [{ productId: productId, productCount: quantity }],
    };
    this.productDetailService
      .postProductDetailData(objToSend)
      .subscribe((success) => {
        this.getCartData(this.userId);
      });
  }

  /// Method to send the product purchased by the user
  order(): void {
    const orderObj = {
      userId: sessionStorage.userId,
      productArray: this.productData?.map((product) => {
        return {
          productId: product.productData._id,
          productCount: product.productCount,
          totalcost:
            product.productCount *
            product.productData.price *
            (1 - product.productData.pSeller.pDiscount),
        };
      }),
    };
    this.cartService.order(orderObj).subscribe((res) => {
      this.router.navigate(['/order']);
    });
  }
}
