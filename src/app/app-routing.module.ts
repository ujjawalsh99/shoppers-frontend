// import the necessary modules and packages
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { GuardService } from './guard.service';

/* 
  1. Configure the routes here to load the routed components
    -- for 'login' route path, it should load LoginComponent
    -- for 'dashboard' route path, it should load DashboardComponent
    -- for 'register' route path, it should load RegistrationComponent
    -- for 'productDetail/:productId' route path, it should load ProductDetailComponent
    -- for 'cart' route path, it should load CartComponent
    -- for 'order' route path, it should load OrderComponent
  2. Any invalid route should redirect to dashboard Page
*/
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'productDetail/:productId',
    component: ProductDetailComponent,
  },
  { path: 'cart', component: CartComponent, canActivate: [GuardService] },
  { path: 'order', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

/// <summary>
/// AppRoutingModule
///</summary>
export class AppRoutingModule {}
