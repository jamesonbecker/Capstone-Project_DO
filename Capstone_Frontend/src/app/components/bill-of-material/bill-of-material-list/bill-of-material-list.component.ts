import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BillOfMaterials } from 'src/app/common/bill-of-materials';
import { BillOfMaterialService } from 'src/app/services/bill-of-material.service';

@Component({
  selector: 'app-bill-of-material-list',
  templateUrl: './bill-of-material-list.component.html',
  styleUrl: '../../../../styles.css',
})
export class BillOfMaterialListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'product.sku',
    'billTotal',
    'dateCreated',
    'lastUpdated',
  ];

  dataSource = new MatTableDataSource<BillOfMaterials>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private billService: BillOfMaterialService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadBillOfMaterials();
  }

  loadBillOfMaterials(): void {
    this.billService.getAllBillOfMaterials().subscribe((boms) => {
      console.log(boms)
      this.dataSource.data = boms;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
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
