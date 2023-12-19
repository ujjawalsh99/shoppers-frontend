import { Component, DoCheck, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements DoCheck {
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  /// Class Variables
  errorMessage: string;
  successMessage: string;
  loginForm: any;
  hide: boolean = true;
  darkTheme = false;

  /// Form Component Validations
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^[a-zA-z0-9._]*?@(gmail|infosys|infy|yahoo|gov).(com|in)$/
    ),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/
    ),
  ]);

  ngDoCheck() {
    this.darkTheme = sessionStorage.theme === 'dark' ? true : false;
  }

  register() {
    this.router.navigate(['/register']);
  }

  /// Method to validating email and password
  getErrorMessage(field) {
    if (field === 'email') {
      return this.email.hasError('required')
        ? 'You must enter a value'
        : this.email.hasError('pattern')
        ? 'Not a valid email'
        : '';
    } else if (field === 'password') {
      return this.password.hasError('required')
        ? 'You must enter a value'
        : this.password.hasError('pattern')
        ? 'Not a valid password'
        : '';
    } else {
      return null;
    }
  }

  /// Method to fetch data for login and store user detail in sessionStorange
  /// Set appropriate message for successMessage and errorMessage
  login() {
    this.successMessage = null;
    this.errorMessage = null;
    this.loginForm = {
      email: this.email.value,
      password: this.password.value,
    };
    this.registerService.login(this.loginForm).subscribe((response) => {
      if (response.error) {
        this.errorMessage = response.data;
        sessionStorage.clear();
      } else {
        this.successMessage = 'Logged in Successfully!';
        sessionStorage.setItem('email', response.data.customerEmail);
        sessionStorage.setItem('userId', response.data._id);
        sessionStorage.setItem('name', response.data.customerName);
        sessionStorage.setItem('phoneNumber', response.data.phoneNumber);
        sessionStorage.setItem('address', response.data.address);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
