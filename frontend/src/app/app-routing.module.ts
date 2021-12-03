import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { UserAccountComponent } from './components/user-account/user-account.component';

const routes: Routes = [
  {
    path: '',component: HomeComponent
  },
  {
    path:'products/:id', component: ProductComponent
  },
  {
    path:'cart', component: CartComponent
  },
  {
    path:'checkout', component: CheckoutComponent
  },
  {
    path:'user-account', component: UserAccountComponent
  },
  {
    path:'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
