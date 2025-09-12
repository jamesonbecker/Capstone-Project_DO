import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrl: '../../../../styles.css',
})
export class ProductTabNavComponent implements OnInit {
  selectedProductId!: number;
  selectedProductSku!: string;
  isKit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.selectedProductId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProduct();
  }

  loadProduct() {
    this.productService
      .getProductById(this.selectedProductId)
      .subscribe((product) => {
        this.selectedProductSku = product.sku;
        this.isKit = product.kit;
      });
  }

  goBack() {
    this.location.back();
  }
}
