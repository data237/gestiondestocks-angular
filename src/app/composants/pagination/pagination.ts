import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [NgForOf],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class Pagination {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number = 0;
  
  @Output() pageChange = new EventEmitter<number>();
  
  Math = Math;
  
  get pages(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
  
  goToFirst(): void {
    this.goToPage(1);
  }
  
  goToLast(): void {
    this.goToPage(this.totalPages);
  }
  
  goToPrevious(): void {
    this.goToPage(this.currentPage - 1);
  }
  
  goToNext(): void {
    this.goToPage(this.currentPage + 1);
  }
}
