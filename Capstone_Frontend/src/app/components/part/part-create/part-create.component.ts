import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Parts } from 'src/app/common/parts';
import { PartsService } from 'src/app/services/parts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { greaterThanZero } from 'src/app/validators/positive-validator';

@Component({
  selector: 'app-part-create',
  templateUrl: './part-create.component.html',
  styleUrl: '../../../../styles.css',
})
export class PartCreateComponent implements OnInit {
  partForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private partService: PartsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.partForm = this.formBuilder.group({
      sku: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^\S(.*)\S$/),
        ],
      ],
      partName: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^\S(.*)\S$/),
        ],
      ],
      description: ['', Validators.pattern(/^\S(.*)\S$/)],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d*\.\d{2}$/),
          greaterThanZero(),
        ],
      ],
      unitsInStock: ['', Validators.pattern(/^\d+$/)],
      location: ['', Validators.pattern(/^\S(.*)\S$/)],
    });
  }

  onSubmit() {
    if (this.partForm.valid) {
      const newPart: Parts = {
        ...this.partForm.value,
      };
      this.partService.createPart(newPart).subscribe(
        () => {
          this.snackBar.open(
            'Part ' + newPart.sku + ' created successfully.',
            'Close',
            {
              duration: 5000,
              panelClass: ['snackbar-success'],
            }
          );
          this.router.navigate(['/parts']);
        },
        (error) => {
          this.snackBar.open(
            'Failed to update part ' + newPart.sku + '. Please try again.',
            'Close',
            {
              duration: 5000,
              panelClass: ['snackbar-error'],
            }
          );
        }
      );
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.partForm.get(field);
    return control?.invalid && control.touched;
  }

  goBack() {
    this.location.back();
  }
}
