import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'sm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps: number
  @Input('limit') limitProps: number
  @Input('url') urlProps: string
  @Input('currentPage') currentPageProps: number
  pagesCount: number
  pages: number[]
  constructor() {}

  getNextPageWithCheck(): number {
    return this.currentPageProps < Math.ceil(this.totalProps / this.limitProps)
      ? this.currentPageProps + 1
      : this.currentPageProps
  }
  getPrevPageWithCheck(): number {
    return this.currentPageProps > 1
      ? this.currentPageProps - 1
      : this.currentPageProps
  }

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps)
    this.pages = Array.from({length: this.pagesCount}).map((_, idx) => idx + 1)
  }
}
