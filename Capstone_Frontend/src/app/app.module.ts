import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';

import { ProductTabNavComponent } from './components/product/product-tab-nav/tab-nav.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductBillDetailsComponent } from './components/product/product-bill-details/product-bill-details.component';
import { ProductAddInventoryComponent } from './components/product/product-add-inventory/product-add-inventory.component';
import { ProductInventoryComponent } from './components/product/product-inventory/product-inventory.component';
import { ProductDeleteDialogComponent } from './components/product/product-delete-dialog/product-delete-dialog.component';

import { SalesOrderListComponent } from './components/sales-order/sales-order-list/sales-order-list.component';
import { SalesOrderDetailsComponent } from './components/sales-order/sales-order-details/sales-order-details.component';
import { SalesOrderCreateComponent } from './components/sales-order/sales-order-create/sales-order-create.component';
import { SalesOrderDeleteDialogComponent } from './components/sales-order/sales-order-delete-dialog/sales-order-delete-dialog.component';

import { PartsListComponent } from './components/part/parts-list/parts-list.component';
import { PartTabNavComponent } from './components/part/part-tab-nav/part-tab-nav.component';
import { PartDetailsComponent } from './components/part/part-details/part-details.component';
import { PartCreateComponent } from './components/part/part-create/part-create.component';
import { PartInventoryComponent } from './components/part/part-inventory/part-inventory.component';
import { PartDeleteDialogComponent } from './components/part/part-delete-dialog/part-delete-dialog.component';

import { BillOfMaterialListComponent } from './components/bill-of-material/bill-of-material-list/bill-of-material-list.component';
import { BillOfMaterialDetailComponent } from './components/bill-of-material/bill-of-material-detail/bill-of-material-detail.component';
import { BillOfMaterialCreateComponent } from './components/bill-of-material/bill-of-material-create/bill-of-material-create.component';
import { BillOfMaterialConfirmComponent } from './components/bill-of-material/bill-of-material-confirm/bill-of-material-confirm.component';
import { BillOfMaterialDenyComponent } from './components/bill-of-material/bill-of-material-deny/bill-of-material-deny.component';
import { BillOfMaterialDeleteDialogComponent } from './components/bill-of-material/bill-of-material-delete-dialog/bill-of-material-delete-dialog.component';

import { PurchaseOrderListComponent } from './components/purchase-order/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderDetailsComponent } from './components/purchase-order/purchase-order-details/purchase-order-details.component';
import { PurchaseOrderCreateDialogComponent } from './components/purchase-order/purchase-order-create/purchase-order-create-dialog/purchase-order-create-dialog.component';
import { PurchaseOrderProductComponent } from './components/purchase-order/purchase-order-create/purchase-order-product/purchase-order-product.component';
import { PurchaseOrderPartComponent } from './components/purchase-order/purchase-order-create/purchase-order-part/purchase-order-part.component';
import { PurchaseOrderDeleteDialogComponent } from './components/purchase-order/purchase-order-delete-dialog/purchase-order-delete-dialog.component';

import { ReportsComponent } from './components/reporting/reports/reports.component';
import { ReportCreateComponent } from './components/reporting/report-create/report-create.component';

import { ProductsService } from './services/products.service';
import { ProductCategoryService } from './services/product-category.service';
import { PartsService } from './services/parts.service';
import { SalesOrdersService } from './services/sales-orders.service';
import { SalesOrdersDetailsService } from './services/sales-orders-details.service';
import { PurchaseOrdersService } from './services/purchase-orders.service';
import { PurchaseOrderDetailsService } from './services/purchase-order-details.service';
import { BillOfMaterialService } from './services/bill-of-material.service';
import { BillOfMaterialDetailService } from './services/bill-of-material-detail.service';
import { InventoryService } from './services/inventory.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductTabNavComponent,
    ProductBillDetailsComponent,
    ProductCreateComponent,
    ProductInventoryComponent,
    ProductAddInventoryComponent,
    ProductDeleteDialogComponent,
    SalesOrderListComponent,
    SalesOrderCreateComponent,
    SalesOrderDetailsComponent,
    SalesOrderDeleteDialogComponent,
    PartsListComponent,
    PartDetailsComponent,
    PartTabNavComponent,
    PartCreateComponent,
    PartInventoryComponent,
    PartDeleteDialogComponent,
    BillOfMaterialListComponent,
    BillOfMaterialDetailComponent,
    BillOfMaterialCreateComponent,
    BillOfMaterialConfirmComponent,
    BillOfMaterialDenyComponent,
    BillOfMaterialDeleteDialogComponent,
    PurchaseOrderListComponent,
    PurchaseOrderProductComponent,
    PurchaseOrderPartComponent,
    PurchaseOrderDetailsComponent,
    PurchaseOrderCreateDialogComponent,
    PurchaseOrderDeleteDialogComponent,
    ReportsComponent,
    ReportCreateComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
],
  providers: [
    ProductsService,
    PartsService,
    ProductCategoryService,
    InventoryService,
    SalesOrdersService,
    SalesOrdersDetailsService,
    BillOfMaterialService,
    BillOfMaterialDetailService,
    PurchaseOrdersService,
    PurchaseOrderDetailsService,
    {
      provide: Window,
      useValue: window,
    },
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}