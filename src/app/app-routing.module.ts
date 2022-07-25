import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./user/home-page/home-page.component";
import {AuthGuard} from "./helper/auth-guard";
import {HomeComponent} from "./home/home.component";
import {AddHouseComponent} from "./add-house/add-house.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HouseDetailComponent} from "./house-detail/house-detail.component";
import {OrderComponent} from "./order/order.component";

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'add-house',
  component: AddHouseComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'house-detail/:id',
  component: HouseDetailComponent
}, {
  path: 'order/:id',
  component: OrderComponent
}, {
  path: 'user',
  canActivate: [AuthGuard],
  component: HomePageComponent,
  loadChildren: () => import('./user/user-routing.module').then(module => module.UserRoutingModule)
}]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
