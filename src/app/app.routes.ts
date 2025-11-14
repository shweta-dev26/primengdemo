import { Routes } from '@angular/router';
import { Product } from './component/product/product';
import { Main } from './component/main/main';
import { Electronic } from './component/electronic/electronic';
import { About } from './component/about/about';

export const routes: Routes = [
    {path:'*',redirectTo:''},
    {path:'',component:Main},
    {path:'product',component:Product},
    {path:'electronic',component:Electronic},
    {path:'about',component:About},
];
