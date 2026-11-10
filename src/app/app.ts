import { Component, OnInit, signal } from '@angular/core';
import { NavbarTopComponent } from './navbars/top-navbar/navbar-top.component';
import { NavbarBubbleComponent } from './navbars/navbar-bubble/navbar-bubble.component';
import { MegaMenuComponent } from './navbars/mega-menu/megamenu.component';
import { FloatingMenuComponent } from './navbars/floating-menu/floating-menu.component';
import { TableComponent } from './table/table.component';
import {
  TEST_USER,
  TEST_BOOKS,
  TEST_USER_COLUMNS,
  TEST_BOOKS_COLUMNS,
} from './test_data/test.data';

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
    this.fetchMockedData(this.selectedMockedData());
  }
  protected readonly title = signal('navbar-playground');
  public selectedNavbar = signal<NAVBAR>('top');

  public selectedMockedData = signal<'books' | 'users'>('users');
  public testData = signal<Array<{}>>(TEST_USER);
  /**
   * column names have to be set up manually->
   */
  public columnNames = signal<Array<string>>(TEST_USER_COLUMNS);
  public tableInputData = signal<Array<{}>>([]);
  public currentPage = signal<number>(0);
  public currentItemPerPage = signal<(number & 5) | 10 | 15 | 20>(10);
  public calculatedNumberOfPages = signal<number>(0);

  onNavbarTypeSelected(event: any) {
    this.selectedNavbar.set(event.target.value);
  }
  /**
   * Table logic here->
   */
  public onTableContentTypeSelected(event: any) {
    this.selectedMockedData.set(event.target.value);
    this.fetchMockedData(event.target.value);
  }

  public fetchMockedData(mockedData: 'books' | 'users') {
    const data: Array<any> = mockedData === 'books' ? TEST_BOOKS : TEST_USER;
    this.columnNames.set(mockedData === 'books' ? TEST_BOOKS_COLUMNS : TEST_USER_COLUMNS);
    this.tableInputData.set(
      data.slice(
        this.currentItemPerPage() * this.currentPage(),
        this.currentItemPerPage() * this.currentPage() + this.currentItemPerPage(),
      ),
    );
    this.calculatedNumberOfPages.set(Math.ceil(this.testData().length / this.currentItemPerPage()));
  }

  public itemSelectedFromTable(id: number) {}

  public paginatorChangedFromTable(paginator: 5 | 10 | 15 | 20) {
    this.currentItemPerPage.set(paginator);
    this.currentPage.set(0);
    this.fetchMockedData(this.selectedMockedData());
  }
  public pageChanged(pageStep: number) {
    this.currentPage.set(this.currentPage() + pageStep);
    this.fetchMockedData(this.selectedMockedData());
  }
}

export type NAVBAR = 'megamenu' | 'top' | 'bubble' | 'floating';
