import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent implements OnInit {
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;
  public pages: number[] = [];
  activePage = 0;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    const pageCount = this.getPageCount(this.totalRecords, 10);
    this.pages = this.getArrayOfPage(pageCount);
  }

  private getArrayOfPage(pageCount: number): number[] {
    let pageArray: number[] = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }

  private getPageCount(totalRecords: number, recordsPerPage: number): number {
    let totalPage = 0;

    if (totalRecords > 0 && recordsPerPage > 0) {
      const pageCount = totalRecords / recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage =
        roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  onClickPage(pageNumber: number) {
    if (pageNumber < 1) return;
    if (pageNumber > this.pages.length) return;
    this.activePage = pageNumber;
    this.onPageChange.emit(this.activePage);
  }
}
