import { Component, OnInit, signal } from '@angular/core';
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
export class App implements OnInit {
  ngOnInit(): void {
    this.fetchMockedData();
  }
  protected readonly title = signal('navbar-playground');
  public selectedNavbar = signal<NAVBAR>('top');

  public testUserData = signal<Array<{}>>(TEST_USER);
  public tableInputTestUserData = signal<Array<{}>>([]);
  public currentPage = signal<number>(0);
  public currentItemPerPage = signal<(number & 5) | 10 | 15 | 20>(10);
  public calculatedNumberOfPages = signal<number>(0);

  onNavbarTypeSelected(value: any) {
    console.log(`${value.target.value} selected`);
    this.selectedNavbar.set(value.target.value);
  }
  /**
   * Table logic here->
   */
  public fetchMockedData() {
    this.tableInputTestUserData.set(
      this.testUserData().slice(
        this.currentItemPerPage() * this.currentPage(),
        this.currentItemPerPage() * this.currentPage() + this.currentItemPerPage(),
      ),
    );
    this.calculatedNumberOfPages.set(
      Math.ceil(this.testUserData().length / this.currentItemPerPage()),
    );
  }

  public itemSelectedFromTable(id: number) {
    console.log(`item ${id} is selected from table`);
  }

  public paginatorChangedFromTable(paginator: 5 | 10 | 15 | 20) {
    this.currentItemPerPage.set(paginator);
    this.currentPage.set(0);
    this.fetchMockedData();
  }
  public pageChanged(pageStep: number) {
    this.currentPage.set(this.currentPage() + pageStep);
    this.fetchMockedData();
  }
}

export type NAVBAR = 'megamenu' | 'top' | 'bubble' | 'floating';
