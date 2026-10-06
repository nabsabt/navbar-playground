import {
  AfterViewInit,
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { fromEvent, throttleTime, debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'floating-menu',
  templateUrl: './floating-menu.component.html',
  imports: [CommonModule],
})
export class FloatingMenuComponent implements AfterViewInit {
  @ViewChild('nav') nav: ElementRef;
  @ViewChild('content') content: ElementRef;

  /**
   * Listening to click->
   */
  @HostListener('document:click', ['$event'])
  clicked(targetElement: ElementRef['nativeElement']) {
    const clicked = this.element.nativeElement.contains(targetElement.target);

    if (clicked && !this.isMenuOpened()) {
      this.isMenuOpened.set(true);
    }
  }

  @HostListener('document:click', ['$event'])
  unclicked(targetElement: ElementRef['nativeElement']) {
    const clicked = !this.element.nativeElement.contains(targetElement.target);
    if (clicked) {
      this.isMenuOpened.set(false);
    }
  }
  private breakPoint = inject(BreakpointObserver);

  public document = inject(DOCUMENT);
  public isMobileView = signal<boolean>(false);
  public isMenuOpened = signal<boolean>(false);
  public navbarContentPos = signal<{ bottom: number; left: number }>({ bottom: 0, left: 0 });

  constructor(private element: ElementRef) {
    this.breakPoint.observe('(max-width: 768px)').subscribe((res) => {
      !res.matches ? this.isMobileView.set(false) : this.isMobileView.set(true);
    });
  }

  ngAfterViewInit(): void {
    const { top, right, left, bottom } = this.nav.nativeElement.getBoundingClientRect();
    this.navbarContentPos.set({ bottom, left });

    fromEvent(window, 'resize')
      .pipe(throttleTime(500), debounceTime(500))
      .subscribe(() => {
        const { top, right, left, bottom } = this.nav.nativeElement.getBoundingClientRect();

        this.navbarContentPos.set({ bottom, left });
      });

    this.nav.nativeElement.addEventListener('mouseenter', () => {
      this.isMenuOpened.set(true);
    });

    this.content.nativeElement.addEventListener('mouseenter', () => {
      this.isMenuOpened.set(true);
    });
    this.nav.nativeElement.addEventListener('mouseleave', () => {
      this.isMenuOpened.set(false);
    });
    this.content.nativeElement.addEventListener('mouseleave', () => {
      this.isMenuOpened.set(false);
    });
  }

  /**
   * Only for mobile->
   */
  menuTapped() {
    this.isMenuOpened.set(!this.isMenuOpened());
  }
}
