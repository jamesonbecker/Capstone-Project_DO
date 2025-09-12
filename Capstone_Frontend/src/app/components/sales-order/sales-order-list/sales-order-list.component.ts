import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesOrders } from 'src/app/common/sales-orders';
import { SalesOrdersService } from 'src/app/services/sales-orders.service';

@Component({
  selector: 'app-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrl: '../../../../styles.css',
})
export class SalesOrderListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'orderTotal',
    'dateCreated',
    'lastUpdated',
  ];

  dataSource = new MatTableDataSource<SalesOrders>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private salesOrderService: SalesOrdersService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadSalesOrders();
  }

  loadSalesOrders() {
    this.salesOrderService.getAllSalesOrders().subscribe((salesOrders) => {
      this.dataSource.data = salesOrders;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goBack() {
    this.location.back();
  }
}
