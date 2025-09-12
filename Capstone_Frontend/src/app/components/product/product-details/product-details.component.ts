import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/common/products';
import { ProductsService } from 'src/app/services/products.service';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { greaterThanZero } from 'src/app/validators/positive-validator';
import { MatDialog } from '@angular/material/dialog';
import { BillOfMaterialConfirmComponent } from '../../bill-of-material/bill-of-material-confirm/bill-of-material-confirm.component';
import { BillOfMaterialService } from 'src/app/services/bill-of-material.service';
import { BillOfMaterials } from 'src/app/common/bill-of-materials';
import { BillOfMaterialDenyComponent } from '../../bill-of-material/bill-of-material-deny/bill-of-material-deny.component';
import { SalesOrdersDetailsService } from 'src/app/services/sales-orders-details.service';
import { PurchaseOrderDetailsService } from 'src/app/services/purchase-order-details.service';
import { PurchaseOrderDetails } from 'src/app/common/purchase-order-details';
import { SalesOrderDetails } from 'src/app/common/sales-order-details';
import { ProductDeleteDialogComponent } from '../product-delete-dialog/product-delete-dialog.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: '../../../../styles.css',
})
export class ProductDetailsComponent implements OnInit {
  productForm!: FormGroup;
  selectedProductId!: number;
  billOfMaterials!: BillOfMaterials;
  productCategories: ProductCategory[] = [];
  kitChecked: boolean = true;
  activeChecked: boolean = true;
  billOfMaterial: string | null = null;

  billOrderNumber: number;

  salesOrder: SalesOrderDetails[] = [];
  purchaseOrder: PurchaseOrderDetails[] = [];
  answer: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private categoryService: ProductCategoryService,
    private billService: BillOfMaterialService,
    private salesOrderService: SalesOrdersDetailsService,
    private purchaseOrderService: PurchaseOrderDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selectedProductId = +this.route.snapshot.paramMap.get('id')!;
    this.buildForm();
    this.loadProduct();
    this.loadCategories();
    if (this.kitChecked) {
      this.billService.getBillOfMaterialByProductId(this.selectedProductId).subscribe((bill) => {
        this.billOrderNumber = bill.id;
      })
    }
    this.salesOrderService
      .getSalesOrderDetailsByProductId(this.selectedProductId)
      .subscribe((results) => {
        this.salesOrder = results;
      });
    this.purchaseOrderService
      .getPurchaseOrderDetailsByProductId(this.selectedProductId)
      .subscribe((results) => {
        this.purchaseOrder = results;
      });
  }

  buildForm() {
    this.productForm = this.formBuilder.group({
      sku: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^\S(.*)\S$/),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^\S(.*)\S$/),
        ],
      ],
      description: ['', Validators.pattern(/^\S(.*)\S$/)],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d*\.\d{2}$/),
          greaterThanZero(),
        ],
      ],
      unitsInStock: ['', Validators.pattern(/^\d+$/)],
      location: ['', Validators.pattern(/^\S(.*)\S$/)],
      categoryId: ['', Validators.required],
    });
  }

  loadProduct() {
    this.productService
      .getProductById(this.selectedProductId)
      .subscribe((product) => {
        this.activeChecked = product.active;
        this.kitChecked = product.kit;
        this.productForm.patchValue({
          sku: product.sku,
          name: product.name,
          description: product.description,
          price: product.price,
          unitsInStock: product.unitsInStock,
          location: product.location,
          categoryId: product.category.id,
        });
      });
  }

  loadCategories() {
    this.categoryService.getAllProductCategories().subscribe((categories) => {
      this.productCategories = categories;
    });
  }

  changeKitValue(value) {
    this.kitChecked = !value;
  }

  changeActiveValue(value) {
    this.activeChecked = !value;
  }

  onKitChange(checked: boolean) {
    this.billService
      .getBillOfMaterialByProductId(this.selectedProductId)
      .subscribe((results) => {
        this.billOfMaterials = results;
        if (checked) {
          this.dialog.open(BillOfMaterialConfirmComponent, {
            data: {
              id: this.selectedProductId,
            },
          });
        } else if (!checked && this.billOfMaterials != null) {
          console.log(this.billOfMaterials);
          this.dialog.open(BillOfMaterialDenyComponent, {
            data: {
              id: this.selectedProductId,
            },
          });
          this.kitChecked = true;
        }
      });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Products = {
        id: this.selectedProductId,
        ...this.productForm.value,
        active: this.activeChecked,
        kit: this.kitChecked,
      };
      console.log(updatedProduct.active);
      this.productService
        .updateProduct(
          this.selectedProductId,
          updatedProduct.categoryId,
          updatedProduct
        )
        .subscribe(
          () => {
            this.snackBar.open(
              'Product ' + updatedProduct.sku + ' updated successfully.',
              'Close',
              {
                duration: 5000,
                panelClass: ['snackbar-success'],
              }
            );
            this.router.navigate(['/products']);
          },
          (error) => {
            this.snackBar.open(
              'Failed to update product ' +
                updatedProduct.sku +
                '. Please try again.',
              'Close',
              {
                duration: 5000,
                panelClass: ['snackbar-error'],
              }
            );
          }
        );
    }
  }

  onDelete() {
    if (this.salesOrder.length != 0) {
      this.snackBar.open(
        'Product cannot be deleted because it has Sales Orders associated.',
        'Close',
        {
          duration: 5000,
          panelClass: ['snackbar-success'],
        }
      );
    } else if (this.purchaseOrder.length != 0) {
      this.snackBar.open(
        'Product cannot be deleted because it has Purchase Orders associated.',
        'Close',
        {
          duration: 5000,
          panelClass: ['snackbar-success'],
        }
      );
    } else {
      const dialogRef = this.dialog.open(ProductDeleteDialogComponent, {
        data: { sku: this.productForm.get('sku').value, answer: this.answer },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == 1) {
          this.productService
            .deleteProduct(this.selectedProductId)
            .subscribe(() => {
              this.snackBar.open(
                'Product has been deleted successfully.',
                'Close',
                {
                  duration: 5000,
                  panelClass: ['snackbar-success'],
                }
              );
              this.router.navigate(['/products']);
            });
        }
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.productForm.get(field);
    return control?.invalid && control.touched;
  }

  navigate(): void {
      this.router.navigate(['/bill-of-materials', this.billOrderNumber])
  }
}
