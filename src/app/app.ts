import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Navbar } from './component/navbar/navbar';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [ButtonModule, AvatarModule, RouterOutlet, NgIf,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
  
})
export class App implements OnInit {
  protected readonly title = signal('primeng-demo');
darkMode=false;
hideheader=true;

constructor(private router:Router){
  this.router.events.pipe(filter(event=>event instanceof NavigationEnd)).subscribe((event:NavigationEnd)=>{
    this.hideheader=event.url !== '/'
  })
}
 ngOnInit() {
  if(typeof window !== 'undefined'){
  const stored = localStorage.getItem('darkMode');
  this.darkMode=stored? stored==='true':window.matchMedia('(prefers-color-scheme:dark)').matches
  this.applyDarkMode(this.darkMode);
}
}

toggleTheme() {
  this.darkMode = !this.darkMode;
  console.log(this.darkMode);
  
  localStorage.setItem('darkMode', String(this.darkMode));
  this.applyDarkMode(this.darkMode);
}

applyDarkMode(enable: boolean) {
  const htmlEl = document.documentElement;
  if (enable) {
    htmlEl.classList.add('my-app-dark'); 
  } else {
    htmlEl.classList.remove('my-app-dark');
  }
}

}
