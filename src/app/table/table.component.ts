import { DatePipe } from '@angular/common';
import { Component, DOCUMENT, inject, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [DatePipe],
})
export class TableComponent implements OnInit {
  public tableName = input<string>();
  public tableData = input<Array<any> | undefined>(undefined);
  public paginatorVal = input<5 | 10 | 15 | 20>(5);
  public cols = input<Array<string>>([]);
  public numberOfPages = input<number>(0);
  public curentpage = input<number>(0);

  public onItemClicked = output<number>();
  public onPaginationChanched = output<5 | 10 | 15 | 20>();
  public onPageChanged = output<number>();

  public document = inject(DOCUMENT);

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

  public onPaginatorValueSelected(event: any) {
    const value = Number(event.value) as 5 | 10 | 15 | 20;
    this.onPaginationChanched.emit(value);
  }

  public onItemSelected(id: number) {
    this.onItemClicked.emit(id);
  }

  public onPageStep(step: number) {
    this.onPageChanged.emit(step);
  }
}
