import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from 'src/app/common/inventory';
import { Parts } from 'src/app/common/parts';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PartsService } from 'src/app/services/parts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-part-inventory',
  templateUrl: './part-inventory.component.html',
  styleUrl: '../../../../styles.css',
})
export class PartInventoryComponent implements OnInit {
  displayedColumns: string[] = [
    'orderNumber',
    'type',
    'quantity',
    'date',
    'availableQuantity',
  ];

  partId: number;
  currentPart: Parts;
  currentPartInventory: Inventory[];

  dataSource = new MatTableDataSource<Inventory>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private partService: PartsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.partId = +this.route.snapshot.paramMap.get('id');
    this.loadInventory(this.partId);
    this.loadPart();
  }

  loadInventory(partId: number): void {
    this.partService.getPartById(partId).subscribe((part) => {
      this.dataSource.data = part.inventory;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadPart() {
    this.partService.getPartById(this.partId).subscribe((part) => {
      this.currentPart = part;
      this.currentPartInventory = part.inventory;
    });
  }

  navigate(orderNumber: number, adjustmentType: string): void {
    if (adjustmentType == 'SO') {
      this.router.navigate(['/sales-orders', orderNumber]);
    } else if (adjustmentType == 'PO') {
      this.router.navigate(['/purchase-orders', orderNumber]);
    } else if (adjustmentType == 'BM') {
      this.router.navigate(['/bill-of-materials', orderNumber]);
    }
  }
}
