import { DatePipe } from '@angular/common';
import { Component, computed, DOCUMENT, inject, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [DatePipe],
})
export class TableComponent implements OnInit {
  public tableName = input<string>();
  public tableData = input<Array<any> | undefined>(undefined);
  public document = inject(DOCUMENT);
  /**
   * Had to be defined manually->
   */
  public cols = signal<Array<string>>([
    'User ID',
    'Name',
    'Age',
    'Address',
    'Registered',
    'Preferences',
  ]);

  constructor() {
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
}
