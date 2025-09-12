import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PartsService } from 'src/app/services/parts.service';

@Component({
  selector: 'app-part-tab-nav',
  templateUrl: './part-tab-nav.component.html',
  styleUrl: '../../../../styles.css',
})
export class PartTabNavComponent implements OnInit {
  selectedPartId!: number;
  selectedPartSku!: string;

  constructor(
    private route: ActivatedRoute,
    private partService: PartsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.selectedPartId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPart();
  }

  loadPart() {
    this.partService.getPartById(this.selectedPartId).subscribe((part) => {
      this.selectedPartSku = part.sku;
    });
  }

  goBack() {
    this.location.back();
  }
}
