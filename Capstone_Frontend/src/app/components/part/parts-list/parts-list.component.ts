import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Parts } from 'src/app/common/parts';
import { PartsService } from 'src/app/services/parts.service';

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrl: '../../../../styles.css',
})
export class PartsListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'sku',
    'name',
    'price',
    'unitsInStock',
    'location',
  ];

  dataSource = new MatTableDataSource<Parts>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private partService: PartsService, private location: Location
  ) {}

  ngOnInit(): void {
    this.loadParts();
  }

  loadParts(): void {
    this.partService.getAllParts().subscribe((parts) => {
      this.dataSource.data = parts;
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
