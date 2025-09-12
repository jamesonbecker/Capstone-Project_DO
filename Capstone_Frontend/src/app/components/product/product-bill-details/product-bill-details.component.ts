import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BillOfMaterialDetail } from 'src/app/common/bill-of-material-detail';
import { BillOfMaterials } from 'src/app/common/bill-of-materials';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BillOfMaterialService } from 'src/app/services/bill-of-material.service';
import { BillOfMaterialDetailService } from 'src/app/services/bill-of-material-detail.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-bill-details',
  templateUrl: './product-bill-details.component.html',
  styleUrl: '../../../../styles.css',
})
export class ProductBillDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'part.sku',
    'quantityNeeded',
    'lineTotal',
  ];

  productId!: number;
  currentProductSku!: string;
  billId!: number;
  billDetails!: BillOfMaterialDetail[];

  dataSource = new MatTableDataSource<BillOfMaterialDetail>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private billService: BillOfMaterialService,
    private billDetailService: BillOfMaterialDetailService,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadBillDetails();
    this.loadProduct();
  }

  loadBillDetails() {
    this.billService
      .getBillOfMaterialByProductId(this.productId)
      .subscribe((bill) => {
        this.billId = bill.id;
        this.billDetailService
          .getBillDetailsByBillId(this.billId)
          .subscribe((details) => {
            this.dataSource.data = details;
            this.dataSource.sort = this.sort;
            console.log(details);
          });
      });
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.currentProductSku = product.sku;
    });
  }
}
