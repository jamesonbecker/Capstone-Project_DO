import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrders } from 'src/app/common/sales-orders';
import { SalesOrdersService } from 'src/app/services/sales-orders.service';
import { SalesOrdersDetailsService } from 'src/app/services/sales-orders-details.service';
import { Products } from 'src/app/common/products';
import { ProductsService } from 'src/app/services/products.service';
import { greaterThanZero } from 'src/app/validators/positive-validator';

@Component({
  selector: 'app-sales-order-create',
  templateUrl: './sales-order-create.component.html',
  styleUrl: '../../../../styles.css',
})
export class SalesOrderCreateComponent implements OnInit {
  salesOrderForm: FormGroup;
  orderDetailsForm: FormGroup;

  orderTotal: number = 0;

  availableProducts: Products[] = [];
  filteredProducts: Observable<Products[]> | undefined;
  selectedProduct: Products | null = null;

  constructor(
    private location: Location,
    private productService: ProductsService,
    private orderService: SalesOrdersService,
    private detailsService: SalesOrdersDetailsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForms();
    this.getAvailableProducts();
  }

  buildForms() {
    this.salesOrderForm = this.formBuilder.group({
      detailLines: this.formBuilder.array([]),
    });
  }

  get detailLines() {
    return this.salesOrderForm.controls['detailLines'] as FormArray;
  }

  getAvailableProducts() {
    this.productService.getAllProducts().subscribe((product: Products[]) => {
      this.availableProducts = product;
    });
  }

  private _filter(sku: string): Products[] {
    const filterValue = sku.toLowerCase();
    return this.availableProducts.filter((option) =>
      option.sku.toLowerCase().includes(filterValue)
    );
  }

  calculateTotals(index: number) {
    const product = this.detailLines.at(index).get('product').value;
    const lineTotal =
      (this.detailLines.at(index).get('quantityOrdered').value || 0) *
      (product.price || 0);
    this.detailLines.at(index).get('lineTotal').setValue(lineTotal.toFixed(2));

    const total = this.detailLines.value.reduce((accumulator, current) => {
      accumulator +=
        (current.quantityOrdered || 0) * (current.product.price || 0);
      return accumulator;
    }, 0);
    this.orderTotal = total.toFixed(2);
  }

  displayProduct(product: Products): string {
    return product && product.sku ? product.sku : '';
  }

  addLine() {
    this.orderDetailsForm = this.formBuilder.group({
      product: [
        <string | Products>'',
        [Validators.required, this.requireSelection.bind(this)],
      ],
      quantityOrdered: [
        '',
        [Validators.required, greaterThanZero(), Validators.pattern(/^\d+$/)],
      ],
      lineTotal: [],
    });

    this.filteredProducts = this.orderDetailsForm
      .get('product')
      .valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.sku)),
        map((sku) => (sku ? this._filter(sku) : this.availableProducts.slice()))
      );

    this.detailLines.push(this.orderDetailsForm);
  }

  removeLine(index: number) {
    const lineTotal = this.detailLines.at(index).get('lineTotal').value;
    const tempTotal = +this.orderTotal - lineTotal;
    this.orderTotal = +tempTotal.toFixed(2);

    this.detailLines.removeAt(index);
  }

  onSubmit() {
    const salesOrder = new SalesOrders(this.orderTotal);

    this.orderService.createSalesOrder(salesOrder).subscribe((response) => {
      const salesOrderId = response.id;
      for (let i = 0; i < this.detailLines.controls.length; i++) {
        const element = this.detailLines.controls[i].value;
        this.detailsService
          .createSalesOrderDetail(element, salesOrderId)
          .subscribe(() => {
            console.log('success');
          });
      }

      this.snackBar.open('Sales Order created successfully.', '', {
        duration: 5000,
        panelClass: ['snackbar-success'],
      });
      this.goToSalesOrderList();
    });
  }

  goToSalesOrderList() {
    this.router.navigate(['/sales-orders']);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.orderDetailsForm.get(field);
    return control?.invalid && control.touched;
  }

  requireSelection(control: FormControl) {
    const value = control.value;
    if (
      typeof value === 'string' ||
      !this.availableProducts.some((product) => product === value)
    ) {
      return { requireSelection: true };
    }
    return null;
  }

  onOptionSelected(product: Products): void {
    this.selectedProduct = product;
  }

  goBack() {
    this.location.back();
  }
}
