import { Component, inject, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';

@Component({
  selector: 'navbar-top',
  templateUrl: './navbar-top.component.html',
  imports: [NgClass],
})
export class NavbarTopComponent {
  public isHamburgerMenuOpened = signal<boolean>(false);
  private breakPoint = inject(BreakpointObserver);

  constructor() {
    this.breakPoint.observe('(max-width: 768px)').subscribe((res) => {
      !res.matches ? this.isHamburgerMenuOpened.set(false) : '';
    });
  }

  toggleHamburgerMenu() {
    this.isHamburgerMenuOpened.set(!this.isHamburgerMenuOpened());
  }
}
