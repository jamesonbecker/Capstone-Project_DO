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
import { PurchaseOrders } from 'src/app/common/purchase-orders';
import { PurchaseOrdersService } from 'src/app/services/purchase-orders.service';
import { PurchaseOrderDetailsService } from 'src/app/services/purchase-order-details.service';
import { Parts } from 'src/app/common/parts';
import { PartsService } from 'src/app/services/parts.service';
import { greaterThanZero } from 'src/app/validators/positive-validator';

@Component({
  selector: 'app-purchase-order-part',
  templateUrl: './purchase-order-part.component.html',
  styleUrl: '../../../../../styles.css',
})
export class PurchaseOrderPartComponent implements OnInit {
  purchaseOrderForm: FormGroup;
  orderDetailsForm: FormGroup;

  orderTotal: number = 0;

  availableParts: Parts[] = [];
  filteredParts: Observable<Parts[]> | undefined;
  selectedPart: Parts | null = null;

  constructor(
    private location: Location,
    private partService: PartsService,
    private orderService: PurchaseOrdersService,
    private detailsService: PurchaseOrderDetailsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForms();
    this.getAvailableParts();
  }

  buildForms() {
    this.purchaseOrderForm = this.formBuilder.group({
      detailLines: this.formBuilder.array([]),
    });
  }

  get detailLines() {
    return this.purchaseOrderForm.controls['detailLines'] as FormArray;
  }

  getAvailableParts() {
    this.partService.getAllParts().subscribe((part: Parts[]) => {
      this.availableParts = part;
    });
  }

  private _filter(sku: string): Parts[] {
    const filterValue = sku.toLowerCase();
    return this.availableParts.filter((option) =>
      option.sku.toLowerCase().includes(filterValue)
    );
  }

  calculateTotals(index: number) {
    const part = this.detailLines.at(index).get('part').value;
    const lineTotal =
      (this.detailLines.at(index).get('quantityOrdered').value || 0) *
      (part.price || 0);
    this.detailLines.at(index).get('lineTotal').setValue(lineTotal.toFixed(2));

    const total = this.detailLines.value.reduce((accumulator, current) => {
      accumulator += (current.quantityOrdered || 0) * (current.part.price || 0);
      return accumulator;
    }, 0);
    this.orderTotal = total.toFixed(2);
  }

  displayPart(part: Parts): string {
    return part && part.sku ? part.sku : '';
  }

  addLine() {
    this.orderDetailsForm = this.formBuilder.group({
      part: [
        <string | Parts>'',
        [Validators.required, this.requireSelection.bind(this)],
      ],
      quantityOrdered: [
        '',
        [Validators.required, greaterThanZero(), Validators.pattern(/^\d+$/)],
      ],
      lineTotal: [],
    });

    this.filteredParts = this.orderDetailsForm.get('part').valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.sku)),
      map((sku) => (sku ? this._filter(sku) : this.availableParts.slice()))
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
    const purchaseOrder = new PurchaseOrders('Part', this.orderTotal);

    this.orderService
      .createPurchaseOrders(purchaseOrder)
      .subscribe((response) => {
        const purchaseOrderId = response.orderNumber;
        for (let i = 0; i < this.detailLines.controls.length; i++) {
          const element = this.detailLines.controls[i].value;
          this.detailsService
            .createPurchaseOrderDetail(element, purchaseOrderId)
            .subscribe(() => {
              console.log('success');
            });
        }

        this.snackBar.open('Sales Order created successfully.', '', {
          duration: 5000,
          panelClass: ['snackbar-success'],
        });
        this.goToPurchaseOrderList();
      });
  }

  goToPurchaseOrderList() {
    this.router.navigate(['/purchase-orders']);
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

  goBack() {
    this.location.back();
  }
}
