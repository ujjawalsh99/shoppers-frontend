// import the necessary modules and packages
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './login/user';
import { RegisterService } from './login/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/// <summary>
/// AppComponent
///</summary>
export class AppComponent implements OnInit, DoCheck {
  darkTheme = false;
  changeTheme() {
    this.darkTheme = !this.darkTheme;
    if (sessionStorage.theme === 'light') {
      sessionStorage.theme = 'dark';
    } else {
      sessionStorage.theme = 'light';
    }
  }
  title = 'Shoppers';
  loggedUser: User;
  userName: string;
  hide = true;
  show = false;
  display = false;
  searchValue = '';

  /// <summary>
  /// constructor
  /// </summary>
  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {
    this.router.navigate(['/dashboard']);
  }

  /// lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    if (sessionStorage.getItem('theme')) {
      this.darkTheme = sessionStorage.theme === 'dark' ? true : false;
    } else {
      sessionStorage.setItem('theme', 'light');
    }
    if (this.searchValue.length === 0) {
      sessionStorage.removeItem('searchKey');
    }
  }

  /// Method for Log out of user and clearing the session.
  logout() {
    const theme = sessionStorage.theme;
    sessionStorage.clear();
    sessionStorage.setItem('theme', theme);
    this.userName = null;
    this.router.navigate(['/login']);
  }

  /// A callback method that performs change-detection, invoked after the default change-detector runs.
  ngDoCheck(): void {
    this.userName = sessionStorage.name;
  }

  /// Method to store the search data into session
  searchProducts(searchKey: any) {
    sessionStorage.setItem('searchKey', searchKey);
    this.router.navigate(['/dashboard']);
  }

  /// Method to search the product on Press Enter
  searchProductTrigger(event, value) {
    if (event.key === 'Enter') {
      this.searchProducts(value);
    }
  }
}
