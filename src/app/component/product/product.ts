import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Apiservice } from '../../services/apiservice';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [TableModule, HttpClientModule, CommonModule, InputTextModule, TagModule,
    SelectModule, MultiSelectModule, ButtonModule, IconFieldModule, InputIconModule, ScrollTopModule, DialogModule, RatingModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  constructor(private api: Apiservice, private cdr: ChangeDetectorRef) {

  }
  allproduct: any[] = []
  loading: boolean = true;
  review: any[] = [];
  searchValue: string;
  clear(table: Table, input) {
    table.clear();
    input.value = '';
    this.searchValue = ''
  }
  ngOnInit() {
    this.getproductdetails();


  }

  getproductdetails() {
    this.api.getproduct().subscribe((value: any) => {
      this.allproduct = value.products;
      console.log(this.allproduct);

      this.cdr.detectChanges();
    });
  }
  reviewDialogVisible = false;
  selectedProduct: any = null;

  showReviews(product: any) {
    this.selectedProduct = product;
    console.log(this.selectedProduct);

    this.reviewDialogVisible = true;
    // console.log(this.reviewDialogVisible);

  }

}
