import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UriService } from './uri.service';
import { GuardService } from './guard.service';
import { RegisterService } from './login/register.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ---------------angular-material--------------------
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCarouselModule } from 'ng-mat-carousel';
//import { MatCarousel, MatCarouselComponent, MatCarouselModule } from '@angular/material/';

import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { RegistrationComponent } from './registration/registration.component';
import { OrderComponent } from './order/order.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ProductDetailComponent,
    CartComponent,
    LoginComponent,
    RegistrationComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatCarouselModule.forRoot(),
    MatMenuModule,
    MatSlideToggleModule,
  ],
  providers: [UriService, RegisterService, GuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
