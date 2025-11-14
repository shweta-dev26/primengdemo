import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { AccordionModule } from 'primeng/accordion';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-about',
  imports: [ImageModule,CommonModule ,AccordionModule,AnimateOnScrollModule
],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
 @ViewChild('small2Image', { static: true }) small2Image!: ElementRef<HTMLImageElement>;
@ViewChild('missionImage', { static: true }) missionImage!: ElementRef<HTMLImageElement>;
@ViewChild('missionSection', { static: true }) missionSection!: ElementRef<HTMLElement>;


  private animationTriggered = false;
  private scrollListener!: () => void;
  private floatingImg!: HTMLImageElement | null;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
     if (!this.small2Image || !this.missionImage || !this.missionSection) {
    console.warn('Some elements are missing!');
    return;
  }
    this.scrollListener = this.renderer.listen('window', 'scroll', () => {
      if (this.animationTriggered) return;

      if (this.isElementInViewport(this.missionSection.nativeElement)) {
        this.animationTriggered = true;
        this.animateImageMove();
      }
    });
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }

  private isElementInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  animateImageMove() {
    if (!this.small2Image || !this.missionImage) return;

    const startRect = this.small2Image.nativeElement.getBoundingClientRect();
    const endRect = this.missionImage.nativeElement.getBoundingClientRect();

    this.floatingImg = this.small2Image.nativeElement.cloneNode(true) as HTMLImageElement;
    this.renderer.addClass(this.floatingImg, 'floating-image');
    this.renderer.setStyle(this.floatingImg, 'width', `${startRect.width}px`);
    this.renderer.setStyle(this.floatingImg, 'height', `${startRect.height}px`);
    this.renderer.setStyle(this.floatingImg, 'top', `${startRect.top}px`);
    this.renderer.setStyle(this.floatingImg, 'left', `${startRect.left}px`);

    document.body.appendChild(this.floatingImg);

    this.renderer.addClass(this.small2Image.nativeElement, 'hidden');
    this.renderer.addClass(this.missionImage.nativeElement, 'hidden');

    const translateX = endRect.left - startRect.left;
    const translateY = endRect.top - startRect.top;
    const scaleX = endRect.width / startRect.width;
    const scaleY = endRect.height / startRect.height;

    requestAnimationFrame(() => {
      this.renderer.setStyle(
        this.floatingImg!,
        'transform',
        `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`
      );
    });

    this.floatingImg.addEventListener('transitionend', () => {
      if (this.floatingImg && this.floatingImg.parentNode) {
        this.floatingImg.parentNode.removeChild(this.floatingImg);
      }
      this.floatingImg = null;

      this.renderer.removeClass(this.missionImage.nativeElement, 'hidden');
    }, { once: true });
  }
}
