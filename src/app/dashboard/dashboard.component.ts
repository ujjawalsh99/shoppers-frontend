// import the necessary modules and packages
import { Component, DoCheck, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { SearchProductService } from '../service/search-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

/// <summary>
/// DashboardComponent
///</summary>
export class DashboardComponent implements OnInit, DoCheck {
  /// Class Variable
  prodToBeSearched: string;
  categorySelected: string;
  errorMessage: string;
  slideShow: boolean;
  productShow: boolean;
  searchKey: any;
  searched: boolean;
  darkTheme = false;

  /// <summary>
  /// constructor
  /// </summary>
  constructor(
    private dashboardService: DashboardService,
    private searchService: SearchProductService
  ) {}

  categories = ['Electronics', 'Shoes', 'Clothing', 'Furniture'];

  /// Images for Carousel
  images = [
    '../../assets/img/furniture_carousel.jpg',
    '../../assets/img/fashion_carousel.jpg',
    '../../assets/img/tech_carousel.jpg',
    '../../assets/img/shoe_carousel.jpg',
  ];

  public productArray: any[] = [];

  /// lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit() {
    this.slideShow = true;
    this.productShow = false;
    this.searched = false;
    this.categorySelected = 'Electronics';
    this.getProductData('Electronics');
  }

  /// A callback method that performs change-detection, invoked after the default change-detector runs.
  /// Used for Search functionality by fetching data from the session
  ngDoCheck() {
    this.darkTheme = sessionStorage.theme === 'dark' ? true : false;
    if (sessionStorage.searchKey !== this.searchKey) {
      this.searchKey = sessionStorage.searchKey;
      if (this.searchKey?.length > 0) {
        this.searched = true;
        sessionStorage.setItem('category', this.categorySelected);
      } else if (sessionStorage.category !== undefined) {
        this.getProductData(sessionStorage.category);
        sessionStorage.removeItem('category');
        sessionStorage.removeItem('searchKey');
      }
    }
    if (this.searched) {
      if (this.searchKey !== undefined) {
        this.searchService.getSearchData(this.searchKey).subscribe((res) => {
          this.productArray = res.data;
          this.slideShow = false;
          this.productShow = true;
        });
        this.searched = false;
      }
    }
  }

  /// Method to get data from database based on category
  /// param -> category - Category selected among Electronics, Shoe, Clothing, Furniture
  getProductData(category: string) {
    if (category !== 'Electronics') {
      category = category.charAt(0).toUpperCase() + category.slice(1);
    }
    this.dashboardService.getProductData(category).subscribe(
      (response) => {
        this.productArray = response.data;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  /// Method for setting the visibility of carousel and fetching sessionStorage Data
  viewProductByCategory(chosenCategory) {
    this.categorySelected = this.categories[chosenCategory.index];
    this.getProductData(this.categorySelected);
    sessionStorage.setItem('category', this.categorySelected);
    this.slideShow = false;
    this.productShow = true;
  }
}
