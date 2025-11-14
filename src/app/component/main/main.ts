import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Table } from 'primeng/table';

import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { Customer } from './customer';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CustomerService } from './CustomerService';
import { Apiservice } from '../../services/apiservice';
import { RouterLink } from "@angular/router";
import { Navbar } from "../navbar/navbar";
import { stringify } from 'querystring';

@Component({
    selector: 'app-main',
    templateUrl: './main.html',
    styleUrl: './main.scss',
    standalone: true,
    imports: [TableModule, CommonModule, InputTextModule, TagModule,
    SelectModule, MultiSelectModule, ButtonModule, IconFieldModule, InputIconModule, SliderModule, FormsModule, CardModule, ButtonModule, RouterLink, Navbar],
    providers: [CustomerService],
    
})

export class Main implements OnInit {
    customers!: Customer[];
darkMode=false;
    representatives=[];
     value = signal<string>("initial"); 
     valueProp: string = this.value();
    statuses!: any[];
customdata:any[]=[];
    loading: boolean = true;

    activityValues: number[] = [0, 100];

    searchValue: string | undefined;

    constructor(private customerService: CustomerService,
        private apiservice:Apiservice, private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
         setTimeout(() => this.getalldata());

       
    }

    reportcard : { title: string; subtitle: string;link?:string }[] = [
      {title:'Beauty Product Sales Report',subtitle:'Unlock insights and trends from your best-selling products',link:'/product'},
         {title:'Electronic Sales Report',subtitle:'Detailed insights into your electronic product performance',link:'/electronic'},
    ]



    getalldata(){
  
  this.apiservice.getPosts().subscribe((data) => {
  Promise.resolve().then(() => {
    this.customdata = data.sort((a, b) => Number(a.id) - Number(b.id));
    // console.log(this.customdata);
    
  });
});

}
toggleTheme(){
  this.darkMode=!this.darkMode;
  console.log( this.darkMode);
  localStorage.setItem('darkmode',String(this.darkMode))
  this.applytheme(this.darkMode)
}

applytheme(enable:boolean){
if(enable){
document.documentElement.classList.add('my-app-dark');
}
else{
  document.documentElement.classList.remove('my-app-dark')
}

}
}