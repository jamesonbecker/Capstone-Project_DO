import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PurchaseOrderDetails } from 'src/app/common/purchase-order-details';
import { PurchaseOrderDetailsService } from 'src/app/services/purchase-order-details.service';
import { PurchaseOrdersService } from 'src/app/services/purchase-orders.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseOrderDeleteDialogComponent } from '../purchase-order-delete-dialog/purchase-order-delete-dialog.component';

@Component({
  selector: 'app-purchase-order-details',
  templateUrl: './purchase-order-details.component.html',
  styleUrl: '../../../../styles.css',
})
export class PurchaseOrderDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'item',
    'quantityOrdered',
    'lineTotal',
    'lineDateCreated',
  ];

  orderId!: number;
  orderType!: string;

  answer: number = 0;

  dataSource = new MatTableDataSource<PurchaseOrderDetails>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private purchaseDetailsService: PurchaseOrderDetailsService,
    private purchaseOrderService: PurchaseOrdersService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.loadPurchaseOrder();
    this.loadPurchaseDetails();
  }

  loadPurchaseOrder() {
    this.purchaseOrderService
      .getPurchaseOrderById(this.orderId)
      .subscribe((order) => {
        this.orderType = order.orderType;
      });
  }

  loadPurchaseDetails() {
    this.purchaseDetailsService
      .getPurchaseOrderDetailsByPurchaseOrderId(this.orderId)
      .subscribe((details) => {
        console.log(details);
        this.dataSource.data = details;
        this.dataSource.sort = this.sort;
      });
  }

  onDelete() {
    const dialogRef = this.dialog.open(PurchaseOrderDeleteDialogComponent, {
      data: { orderId: this.orderId, answer: this.answer },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.purchaseOrderService
          .deletePurchaseOrder(this.orderId)
          .subscribe(() => {
            this.snackBar.open(
              'Purchase Order has been deleted successfully.',
              'Close',
              {
                duration: 5000,
                panelClass: ['snackbar-success'],
              }
            );
            this.router.navigate(['/purchase-orders']);
          });
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
