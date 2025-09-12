import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/common/products';
import { ProductsService } from 'src/app/services/products.service';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { greaterThanZero } from 'src/app/validators/positive-validator';
import { MatDialog } from '@angular/material/dialog';
import { BillOfMaterialConfirmComponent } from '../../bill-of-material/bill-of-material-confirm/bill-of-material-confirm.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: '../../../../styles.css',
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  productCategories: ProductCategory[] = [];
  kitChecked: boolean = false;
  activeChecked: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private categoryService: ProductCategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadCategories();
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
      productName: [
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
      unitsInStock: ['', [Validators.pattern(/^\d+$/), greaterThanZero()]],
      location: ['', Validators.pattern(/^\S(.*)\S$/)],
      categoryId: ['', Validators.required],
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

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Products = {
        ...this.productForm.value,
        active: this.activeChecked,
        kit: this.kitChecked,
      };
      if (newProduct.kit) {
        this.productService
          .createProduct(newProduct, newProduct.categoryId)
          .subscribe((results) => {
            this.snackBar.open(
              'Product ' + newProduct.sku + ' created successfully.',
              'Close',
              {
                duration: 5000,
                panelClass: ['snackbar-success'],
              }
            );
            this.dialog.open(BillOfMaterialConfirmComponent, {
              data: {
                id: results.id,
                close: 1,
              },
            });
          });
      } else {
        this.productService
          .createProduct(newProduct, newProduct.categoryId)
          .subscribe(
            () => {
              this.snackBar.open(
                'Product ' + newProduct.sku + ' created successfully.',
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
                  newProduct.sku +
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
  }

  isFieldInvalid(field: string): boolean {
    const control = this.productForm.get(field);
    return control?.invalid && control.touched;
  }

  goBack() {
    this.location.back();
  }
}
