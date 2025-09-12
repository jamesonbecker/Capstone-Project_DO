import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Parts } from 'src/app/common/parts';
import { map, Observable, startWith } from 'rxjs';
import { BillOfMaterialService } from 'src/app/services/bill-of-material.service';
import { PartsService } from 'src/app/services/parts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/common/products';
import { ProductsService } from 'src/app/services/products.service';
import { BillOfMaterials } from 'src/app/common/bill-of-materials';
import { BillOfMaterialDetailService } from 'src/app/services/bill-of-material-detail.service';
import { greaterThanZero } from 'src/app/validators/positive-validator';

@Component({
  selector: 'app-bill-of-material-create',
  templateUrl: './bill-of-material-create.component.html',
  styleUrl: '../../../../styles.css',
})
export class BillOfMaterialCreateComponent implements OnInit {
  billOfMaterialForm: FormGroup;
  orderDetailsForm: FormGroup;

  tempBillOfMaterial = new BillOfMaterials();

  selectedProduct: Products;
  selectedProductId: number;

  availableParts: Parts[] = [];
  filteredParts: Observable<Parts[]> | undefined;
  selectedPart: Parts | null = null;

  bomPrice: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private billService: BillOfMaterialService,
    private billDetailService: BillOfMaterialDetailService,
    private partService: PartsService,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.buildForm();
    this.loadAvailableParts();
  }

  buildForm() {
    this.billOfMaterialForm = this.formBuilder.group({
      detailLines: this.formBuilder.array([]),
    });
  }

  addLine() {
    this.orderDetailsForm = this.formBuilder.group({
      part: [
        <string | Parts>'',
        [Validators.required, this.requireSelection.bind(this)],
      ],
      quantityNeeded: [
        '',
        [Validators.required, greaterThanZero(), Validators.pattern(/^\d+$/)],
      ],
      lineTotal: [],
    });

    this.filteredParts = this.orderDetailsForm
      .get('part')
      .valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.sku)),
        map((sku) => (sku ? this._filter(sku) : this.availableParts.slice()))
      );

    this.detailLines.push(this.orderDetailsForm);
  }

  displayPart(part: Parts): string {
    return part && part.sku ? part.sku : '';
  }

  onPartSelect(part: Parts): void {
    this.selectedPart = part;
  }

  loadAvailableParts() {
    this.partService.getAllParts().subscribe((part: Parts[]) => {
      this.availableParts = part;
    });
  }

  loadProduct() {
    this.selectedProductId = +this.route.snapshot.paramMap.get('id');
    this.productService
      .getProductById(this.selectedProductId)
      .subscribe((product) => {
        this.selectedProduct = product;
      });
  }

  private _filter(sku: string): Parts[] {
    const filterValue = sku.toLowerCase();
    return this.availableParts.filter((option) =>
      option.sku.toLowerCase().includes(filterValue)
    );
  }

  get detailLines(): FormArray {
    return this.billOfMaterialForm.get('detailLines') as FormArray;
  }

  calculateTotals(index: number) {
    const part = this.detailLines.at(index).get('part').value;

    const partTotal =
      (this.detailLines.at(index).get('quantityNeeded').value || 0) *
      (part.price || 0);

    this.detailLines.at(index).get('lineTotal').setValue(partTotal.toFixed(2));

    const total = this.detailLines.value.reduce((accumulator, current) => {
      accumulator += (current.quantityNeeded || 0) * (current.part.price || 0);
      return accumulator;
    }, 0);

    this.bomPrice = total.toFixed(2);
  }

  removeLine(index: number) {
    const lineTotal = this.detailLines.at(index).get('lineTotal').value;
    const tempTotal = +this.bomPrice - lineTotal;
    this.bomPrice = +tempTotal.toFixed(2);

    this.detailLines.removeAt(index);
  }

  onSubmit() {
    if (this.billOfMaterialForm.valid) {
      const billOfMaterial: BillOfMaterials = {
        billTotal: this.bomPrice,
        ...this.billOfMaterialForm.value,
      };

      this.billService
        .createBillOfMaterial(billOfMaterial, this.selectedProductId)
        .subscribe((response) => {
          const billOfMaterialId = response.id;
          for (let i = 0; i < this.detailLines.controls.length; i++) {
            const element = this.detailLines.controls[i].value;
            this.billDetailService
              .createBillDetail(element, billOfMaterialId)
              .subscribe(() => {
                console.log('success');
              });
          }
          this.productService
            .updateProductIsKit(this.selectedProductId, this.selectedProduct)
            .subscribe(() => {
              console.log('success');
            });
          this.goToProduct();
        });
    }
  }

  onCancel() {
    this.goToProduct();
  }

  isFieldInvalid(field: string): boolean {
    const control = this.orderDetailsForm.get(field);
    return control?.invalid && control.touched;
  }

  requireSelection(control: FormControl) {
    const value = control.value;
    if (
      typeof value === 'string' ||
      !this.availableParts.some((part) => part === value)
    ) {
      return { requireSelection: true };
    }
    return null;
  }

  onOptionSelected(part: Parts): void {
    this.selectedPart = part;
  }

  goToProduct() {
    this.router.navigate(['/products', this.selectedProductId]);
  }

  goBack() {
    this.location.back();
  }
}
