import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';

@Component({
  selector: 'navbar-top',
  templateUrl: './navbar-top.component.html',
  imports: [NgClass],
})
export class NavbarTopComponent {
  public isHamburgerMenuOpened = signal<boolean>(false);
  private breakPoint = inject(BreakpointObserver);
  public document = inject(DOCUMENT);

  constructor() {
    this.breakPoint.observe('(max-width: 768px)').subscribe((res) => {
      !res.matches ? this.isHamburgerMenuOpened.set(false) : '';
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

  toggleHamburgerMenu() {
    this.isHamburgerMenuOpened.set(!this.isHamburgerMenuOpened());
  }
}
