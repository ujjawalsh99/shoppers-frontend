// import the necessary modules and packages
import { Component, DoCheck, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})

/// <summary>
/// OrderComponent
///</summary>
export class OrderComponent implements OnInit, DoCheck {
  /// Class Variables
  orderEmpty: boolean = true;
  userId: string;
  orderData: Array<any>;
  darkTheme = false;

  options: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  public date: any;

  /// <summary>
  /// constructor
  /// </summary>
  constructor(private orderService: OrderService) {
    this.date = new Date().toLocaleDateString('en-US', this.options);
    setTimeout(() => console.log(this.orderData), 1000);
  }

  /// lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    this.userId = sessionStorage.userId;
    this.getOrder(this.userId);
  }
  ngDoCheck(): void {
    this.darkTheme = sessionStorage.theme === 'dark' ? true : false;
  }

  /// Method to recieve all the order details of the user
  /// userId - fetch order details using user email id.
  getOrder(userId) {
    this.orderService.getOrder(userId).subscribe((res) => {
      if (!res.error) {
        this.orderData = res.data;
        if (res.data.length > 0) this.orderEmpty = false;
      } else {
        console.log('Order fetch failed');
      }
    });
  }
}
