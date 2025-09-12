import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SalesOrderDetails } from 'src/app/common/sales-order-details';
import { SalesOrdersDetailsService } from 'src/app/services/sales-orders-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SalesOrderDeleteDialogComponent } from '../sales-order-delete-dialog/sales-order-delete-dialog.component';
import { SalesOrdersService } from 'src/app/services/sales-orders.service';

@Component({
  selector: 'app-sales-order-details',
  templateUrl: './sales-order-details.component.html',
  styleUrl: '../../../../styles.css',
})
export class SalesOrderDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'product.sku',
    'quantityOrdered',
    'lineTotal',
    'lineDateCreated',
  ];

  orderId!: number;
  orderDetailId!: number;
  orderDetails!: SalesOrderDetails[];

  answer: number = 0;

  dataSource = new MatTableDataSource<SalesOrderDetails>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orderDetailsService: SalesOrdersDetailsService,
    private salesOrderService: SalesOrdersService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.orderDetailsService
      .getSalesOrderDetailsBySalesOrderId(this.orderId)
      .subscribe((details) => {
        console.log(details);
        this.dataSource.data = details;
        this.dataSource.sort = this.sort;
      });
  }

  onDelete() {
    const dialogRef = this.dialog.open(SalesOrderDeleteDialogComponent, {
      data: { orderId: this.orderId, answer: this.answer },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.salesOrderService.deleteSalesOrder(this.orderId).subscribe(() => {
          this.snackBar.open(
            'Sales Order has been deleted successfully.',
            'Close',
            {
              duration: 5000,
              panelClass: ['snackbar-success'],
            }
          );
          this.router.navigate(['/sales-orders']);
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
