import { Component, signal } from '@angular/core';
import { NavbarTopComponent } from './navbars/top-navbar/navbar-top.component';
import { NavbarBubbleComponent } from './navbars/navbar-bubble/navbar-bubble.component';
import { MegaMenuComponent } from './navbars/mega-menu/megamenu.component';
import { FloatingMenuComponent } from './navbars/floating-menu/floating-menu.component';
import { TableComponent } from './table/table.component';
import { TEST_USER } from './test_data/test.data';

@Component({
  imports: [
    NavbarTopComponent,
    NavbarBubbleComponent,
    MegaMenuComponent,
    FloatingMenuComponent,
    TableComponent,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('navbar-playground');
  public selectedNavbar = signal<NAVBAR>('top');

  public testUserData = signal<Array<{}>>(TEST_USER);

  onNavbarTypeSelected(value: any) {
    console.log(`${value.target.value} selected`);
    this.selectedNavbar.set(value.target.value);
  }
}

export type NAVBAR = 'megamenu' | 'top' | 'bubble' | 'floating';
