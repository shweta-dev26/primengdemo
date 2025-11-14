import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Apiservice } from '../../services/apiservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { ConfirmDialog } from "primeng/confirmdialog";


@Component({
  selector: 'app-electronic',
  imports: [TableModule, CommonModule, InputTextModule, TagModule,
    SelectModule, MultiSelectModule, ButtonModule, IconFieldModule, InputIconModule, SliderModule, FormsModule, CardModule, ButtonModule, Toast, ConfirmDialog],
  providers: [MessageService, ConfirmationService],
  templateUrl: './electronic.html',
  styleUrl: './electronic.scss',
})
export class Electronic {

  currentProduct: any;
  selectedProducts: any[] = [];
  data: any[] = [];


  constructor(private api: Apiservice,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService, private messageService: MessageService,
  ) {
  }
  ngOnInit() {
    setTimeout(() => this.getelectodata()); 
  }


  getelectodata() {
    this.api.getPosts().subscribe((resp) => {
      this.data = resp?.sort((a, b) => Number(a.id) - Number(b.id)); //for sorted data id wise
      
      this.cdr.markForCheck();
    });
  }

  editProduct(product: any) {
    console.log('Edit', product);
  }

  deleteProduct(product: any) {
    console.log('Delete', product);
    this.confirm2(product);
  }
  
  isSelected(product: any): boolean {
    return this.selectedProducts.includes(product);
  }


  confirm2(product: any) {
    this.confirmationService.confirm({     
      message: 'Do you want to delete this record?',
       key: 'delete',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {

        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.delete(this.currentProduct);
      },
      reject: () => {

        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });

      },
    });
  }

 delete(product: any) {
  this.currentProduct = product;
  this.confirm2(product);
   if (!this.selectedProducts || this.selectedProducts.length === 0) return;

  // Remove selected products from data
  this.data = this.data.filter(p => !this.selectedProducts.includes(p));

  // Clear selection
  this.selectedProducts = [];
}

}
