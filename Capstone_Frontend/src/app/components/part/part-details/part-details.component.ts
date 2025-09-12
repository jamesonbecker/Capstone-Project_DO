import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Parts } from 'src/app/common/parts';
import { PartsService } from 'src/app/services/parts.service';
import { greaterThanZero } from 'src/app/validators/positive-validator';
import { PurchaseOrderDetails } from 'src/app/common/purchase-order-details';
import { PurchaseOrderDetailsService } from 'src/app/services/purchase-order-details.service';
import { BillOfMaterialDetailService } from 'src/app/services/bill-of-material-detail.service';
import { MatDialog } from '@angular/material/dialog';
import { BillOfMaterialDetail } from 'src/app/common/bill-of-material-detail';
import { PartDeleteDialogComponent } from '../part-delete-dialog/part-delete-dialog.component';

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrl: '../../../../styles.css',
})
export class PartDetailsComponent implements OnInit {
  partForm!: FormGroup;
  selectedPartId!: number;

  purchaseOrder: PurchaseOrderDetails[] = [];
  billOfMaterials: BillOfMaterialDetail[] = [];
  answer: number = 0;

  constructor(
    private partService: PartsService,
    private purchaseOrderService: PurchaseOrderDetailsService,
    private billOfMaterialService: BillOfMaterialDetailService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selectedPartId = +this.route.snapshot.paramMap.get('id')!;
    this.buildForm();
    this.loadPart();
    this.purchaseOrderService
      .getPurchaseOrderDetailsByPartId(this.selectedPartId)
      .subscribe((result) => {
        this.purchaseOrder = result;
      });
    this.billOfMaterialService
      .getBillDetailsByPartId(this.selectedPartId)
      .subscribe((result) => {
        this.billOfMaterials = result;
      });
  }

  buildForm() {
    this.partForm = this.formBuilder.group({
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
    });
  }

  loadPart() {
    this.partService.getPartById(this.selectedPartId).subscribe((part) => {
      this.partForm.patchValue({
        sku: part.sku,
        name: part.name,
        description: part.description,
        price: part.price,
        unitsInStock: part.unitsInStock,
        location: part.location,
      });
    });
  }

  onSubmit() {
    if (this.partForm.valid) {
      const updatedPart: Parts = {
        id: this.selectedPartId,
        ...this.partForm.value,
      };
      this.partService.updatePart(this.selectedPartId, updatedPart).subscribe(
        () => {
          this.snackBar.open(
            'Part ' + updatedPart.sku + ' updated successfully.',
            'Close',
            {
              duration: 5000,
              panelClass: ['snackbar-success'],
            }
          );
          this.router.navigate(['/parts']);
        },
        (error) => {
          this.snackBar.open(
            'Failed to update part ' + updatedPart.sku + '. Please try again.',
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
    if (this.purchaseOrder.length != 0) {
      this.snackBar.open(
        'Part cannot be deleted because it has Sales Orders associated.',
        'Close',
        {
          duration: 5000,
          panelClass: ['snackbar-success'],
        }
      );
    } else if (this.billOfMaterials.length != 0) {
      this.snackBar.open(
        'Part cannot be deleted because it is a part of a Bill of Material.',
        'Close',
        {
          duration: 5000,
          panelClass: ['snackbar-success'],
        }
      );
    } else {
      const dialogRef = this.dialog.open(PartDeleteDialogComponent, {
        data: { sku: this.partForm.get('sku').value, answer: this.answer },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == 1) {
          this.partService.deletePart(this.selectedPartId).subscribe(() => {
            this.snackBar.open('Part has been deleted successfully.', 'Close', {
              duration: 5000,
              panelClass: ['snackbar-success'],
            });
            this.router.navigate(['/parts']);
          });
        }
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.partForm.get(field);
    return control?.invalid && control.touched;
  }
}
