import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { fromEvent, throttleTime, debounceTime } from 'rxjs';

@Component({
  selector: 'mega-menu',
  templateUrl: './megamenu.component.html',
  imports: [CommonModule],
})
export class MegaMenuComponent implements OnInit, AfterViewInit {
  @HostListener('document:click', ['$event'])
  clicked(targetElement: ElementRef['nativeElement']) {
    const clickedInside = this.element.nativeElement.contains(targetElement.target);
    if (!clickedInside) {
      this.isMenuOpened.set(false);
      this.subMenuOpened.set(undefined);
    }
  }

  @ViewChild('nav') nav: ElementRef;
  public isMenuOpened = signal<boolean>(false);
  public isMobileView = signal<boolean>(false);
  public subMenuOpened = signal<string | undefined>('');

  public document = inject(DOCUMENT);
  public currentNavbarPos = signal<{ top: number; right: number; left: number; bottom: number }>({
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  });
  private breakPoint = inject(BreakpointObserver);

  constructor(private element: ElementRef) {
    this.breakPoint.observe('(max-width: 768px)').subscribe((res) => {
      !res.matches ? this.isMenuOpened.set(false) : '';
      !res.matches ? this.isMobileView.set(false) : this.isMobileView.set(true);
    });

    /**
     * checking for dark mode->
     */
    const darkModeOn =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (darkModeOn) {
      this.document.body.classList.add('dark');
    } else {
      this.document.body.classList.remove('dark');
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(throttleTime(500), debounceTime(500))
      .subscribe(() => {
        const { top, right, left, bottom } = this.nav.nativeElement.getBoundingClientRect();

        this.currentNavbarPos.set({ top, right, left, bottom });
        !this.isMenuOpened() && this.subMenuOpened() ? this.subMenuOpened.set(undefined) : '';
      });
  }

  toggleMenu() {
    this.isMenuOpened.set(!this.isMenuOpened());
    !this.isMenuOpened() ? this.subMenuOpened.set(undefined) : '';
  }

  toggleSubMenu(submenu: string) {
    if (this.subMenuOpened() === submenu) {
      this.subMenuOpened.set(undefined);
    } else {
      const { top, right, left, bottom } = this.nav.nativeElement.getBoundingClientRect();
      this.currentNavbarPos.set({ top, right, left, bottom });

      this.subMenuOpened.set(submenu);
    }
  }

  menuItemSelected(value: string) {
    console.log(`${value} selected`);
    this.subMenuOpened.set(undefined);
    this.isMobileView() ? this.isMenuOpened.set(false) : '';
  }
}
