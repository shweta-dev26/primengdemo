import { AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, Input, input, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Ripple } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { EventEmitter as NgEventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { filter, Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-navbar',
  imports: [ToolbarModule, ButtonModule, DrawerModule, AvatarModule, StyleClass, Ripple, CommonModule, RouterLink, ConfirmDialogModule, ToastModule, FormsModule, DialogModule, PasswordModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true,
  providers: [ConfirmationService]
})
export class Navbar {
  @Input() darkMode = false;
  @Output() toggleTheme = new NgEventEmitter<void>();
  @ViewChild('drawerRef') drawerRef!: Drawer;
  isMobile: boolean = false;
  displayLogin: boolean = false;
  username: string = '';
  password: string = '';
  visible: boolean = false;
  value!: string;
  isBrowser = typeof document !== 'undefined';
  router = inject(Router)
  private breakpointSub?: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService

  ) {



  }

  ngOnInit() {
    if (typeof document !== 'undefined') {
      this.breakpointSub = this.breakpointObserver
        .observe(['(max-width: 980px)'])
        .subscribe((state: BreakpointState) => {
          this.isMobile = state.matches;
          this.cdr.detectChanges();
        });
    }
  }

  ngOnDestroy() {
    this.breakpointSub?.unsubscribe();
  }

  closeCallback(e: Event): void {
    this.drawerRef.close(e);
  }
  loginpop() {
    this.displayLogin = !this.displayLogin;
  }

  login() {
    console.log('Username:', this.username, 'Password:', this.password);
    this.displayLogin = false;
    // console.log(this.displayLogin);

  }



  showDialog() {
    this.visible = true;
  }
  closeDialog() {
    this.visible = false;
  }

}
