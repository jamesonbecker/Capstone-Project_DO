import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from 'src/app/common/inventory';
import { Products } from 'src/app/common/products';
import { ProductsService } from 'src/app/services/products.service';
import { ProductAddInventoryComponent } from '../product-add-inventory/product-add-inventory.component';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrl: '../../../../styles.css',
})
export class ProductInventoryComponent implements OnInit {
  displayedColumns: string[] = [
    'orderNumber',
    'type',
    'quantity',
    'date',
    'availableQuantity',
  ];

  productId: number;
  currentProduct: Products;
  currentProductInventory: Inventory[];
  isKit!: boolean;

  dataSource = new MatTableDataSource<Inventory>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.loadInventory(this.productId);
    this.loadProduct();
  }

  loadInventory(productId: number): void {
    this.productService.getProductById(productId).subscribe((product) => {
      this.dataSource.data = product.inventory;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.currentProduct = product;
      this.currentProductInventory = product.inventory;
      this.isKit = product.kit;
    });
  }

  addInventory() {
    const dialogRef = this.dialog
      .open(ProductAddInventoryComponent, {
        data: {
          id: this.productId,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        dialogRef.unsubscribe();
        if (shouldReload) window.location.reload();
      });
  }

  navigate(orderNumber: number, adjustmentType: string): void {
    if (adjustmentType == 'SO') {
      this.router.navigate(['/sales-orders', orderNumber])
    } else if (adjustmentType == 'PO') {
      this.router.navigate(['/purchase-orders', orderNumber])
    } else if (adjustmentType == 'BM') {
      this.router.navigate(['/bill-of-materials', orderNumber])
    }
  }
}
