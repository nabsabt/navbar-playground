import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, DOCUMENT, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'navbar-bubble',
  templateUrl: './navbar-bubble.component.html',
  imports: [CommonModule],
})
export class NavbarBubbleComponent implements OnInit {
  public isHamburgerMenuOpened = signal<boolean>(false);
  public isMobileView = signal<boolean>(false);
  public document = inject(DOCUMENT);
  private breakPoint = inject(BreakpointObserver);

  constructor() {
    this.breakPoint.observe('(max-width: 768px)').subscribe((res) => {
      !res.matches ? this.isHamburgerMenuOpened.set(false) : '';
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
  ngOnInit(): void {
    console.log(`initial view is ${this.isMobileView() ? 'MOBILE' : 'PC'}`);
  }

  toggleHamburgerMenu() {
    this.isHamburgerMenuOpened.set(!this.isHamburgerMenuOpened());
  }
}
