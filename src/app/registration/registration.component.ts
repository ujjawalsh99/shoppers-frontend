// import the necessary modules and packages
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

/// <summary>
/// RegistrationComponent
///</summary>
export class RegistrationComponent implements OnInit, DoCheck {
  /// <summary>
  /// constructor
  /// </summary>
  constructor(
    private rg: FormBuilder,
    private register_service: RegistrationService,
    private router: Router
  ) {}

  /// Class Variables
  public successMessage: string = '';
  public errorMessage: string = '';
  public registrationForm: FormGroup = new FormGroup({});
  public hide: boolean = true;
  public darkTheme = false;

  ngDoCheck() {
    this.darkTheme = sessionStorage.theme === 'dark' ? true : false;
  }

  /// lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    this.registrationForm = this.rg.group({
      customerEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-z0-9._]*?@(gmail|infosys|infy|yahoo|gov).(com|in)$'
          ),
        ],
      ],
      customerName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[1-9][0-9]{9}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$'
          ),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[.0-9a-zA-Z ,-]+$'),
        ],
      ],
    });
  }

  /// Method for calulating the time to redirect to login page after clicking registration button
  setTimerToLogin() {
    var timeleft = 5;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById('countdown').innerHTML = 'Redirecting...';
      } else {
        document.getElementById('countdown').innerHTML =
          timeleft + ' seconds remaining';
      }
      timeleft -= 1;
    }, 1000);
  }

  /// Method for sending the new user data to the service layer
  registerUser() {
    this.successMessage = null;
    this.errorMessage = null;
    this.register_service
      .registerUserService(this.registrationForm.value)
      .subscribe((res) => {
        if (res.error) {
          this.errorMessage = 'User already exists!!';
        } else {
          this.successMessage = 'User Registered Successfully!';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 7000);

          this.setTimerToLogin();
        }
      });
  }
}
