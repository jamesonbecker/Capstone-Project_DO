import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProductTabNavComponent } from './components/product/product-tab-nav/tab-nav.component';
import { SalesOrderListComponent } from './components/sales-order/sales-order-list/sales-order-list.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { SalesOrderDetailsComponent } from './components/sales-order/sales-order-details/sales-order-details.component';
import { PartsListComponent } from './components/part/parts-list/parts-list.component';
import { BillOfMaterialListComponent } from './components/bill-of-material/bill-of-material-list/bill-of-material-list.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { SalesOrderCreateComponent } from './components/sales-order/sales-order-create/sales-order-create.component';
import { BillOfMaterialCreateComponent } from './components/bill-of-material/bill-of-material-create/bill-of-material-create.component';
import { BillOfMaterialDetailComponent } from './components/bill-of-material/bill-of-material-detail/bill-of-material-detail.component';
import { PartTabNavComponent } from './components/part/part-tab-nav/part-tab-nav.component';
import { HomeComponent } from './components/home/home/home.component';
import { PurchaseOrderProductComponent } from './components/purchase-order/purchase-order-create/purchase-order-product/purchase-order-product.component';
import { PurchaseOrderPartComponent } from './components/purchase-order/purchase-order-create/purchase-order-part/purchase-order-part.component';
import { PurchaseOrderListComponent } from './components/purchase-order/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderDetailsComponent } from './components/purchase-order/purchase-order-details/purchase-order-details.component';
import { PartCreateComponent } from './components/part/part-create/part-create.component';
import { ReportsComponent } from './components/reporting/reports/reports.component';

export const appRoutes: Routes = [
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'parts/create', component: PartCreateComponent },
  { path: 'sales-orders/create', component: SalesOrderCreateComponent },
  {
    path: 'purchase-orders/productsCreate',
    component: PurchaseOrderProductComponent,
  },
  {
    path: 'purchase-orders/partsCreate',
    component: PurchaseOrderPartComponent,
  },
  {
    path: 'bill-of-materials/products/:id',
    component: BillOfMaterialCreateComponent,
  },

  { path: 'products/:id', component: ProductTabNavComponent },
  { path: 'sales-orders/:id', component: SalesOrderDetailsComponent },
  { path: 'bill-of-materials/:id', component: BillOfMaterialDetailComponent },
  { path: 'parts/:id', component: PartTabNavComponent },
  { path: 'purchase-orders/:id', component: PurchaseOrderDetailsComponent },

  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'sales-orders', component: SalesOrderListComponent, canActivate: [AuthGuard] },
  { path: 'parts', component: PartsListComponent, canActivate: [AuthGuard] },
  { path: 'purchase-orders', component: PurchaseOrderListComponent, canActivate: [AuthGuard] },
  { path: 'bill-of-materials', component: BillOfMaterialListComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
