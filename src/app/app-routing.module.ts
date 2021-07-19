import { OrderListComponent } from './components/order-list/order-list.component';
import { LogComponent } from './components/log/log.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddTaxComponent } from './components/add-tax/add-tax.component';
import { CategoryComponent } from './components/category/category.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductComponent } from './components/product/product.component';
import { TaxComponent } from './components/tax/tax.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'tax', component: TaxComponent },
  { path: 'tax/add', component: AddTaxComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/add', component: AddCategoryComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'log', component: LogComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/orderList', component: OrderListComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
