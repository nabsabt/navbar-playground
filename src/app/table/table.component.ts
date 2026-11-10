import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  computed,
  DOCUMENT,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [DatePipe, CommonModule],
})
export class TableComponent implements OnInit {
  public tableName = input<string>();
  public tableData = input<Array<any> | undefined>(undefined);
  public paginatorVal = input<5 | 10 | 15 | 20>(5);
  public cols = input<Array<string>>([]);
  public colWidthRatio = input<Array<number> | undefined>(undefined);
  public numberOfPages = input<number>(0);
  public curentpage = input<number>(0);

  public onItemClicked = output<number>();
  public onPaginationChanched = output<5 | 10 | 15 | 20>();
  public onPageChanged = output<number>();

  public document = inject(DOCUMENT);
  public calculatedColWidth = computed(() => {
    const ratios = this.colWidthRatio();

    const colCount = this.cols().length;

    if (!colCount) return [];
    const values = ratios ?? Array(colCount).fill(1);
    const totalUnit = values.reduce((sum, ratio) => sum + ratio, 0);
    return values.map((ratio) => `${(ratio / totalUnit) * 100}%`);
  });

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
