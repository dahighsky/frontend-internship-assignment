import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { Doc } from 'src/app/core/models/book-response.model';
import { SearchService } from 'src/app/core/services/search.service';
import { CacheService } from 'src/app/core/services/cache.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  isLoading = false;
  cachedResults: Doc[] = [];
  searchResults: Doc[] = [];
  errorMessage = '';
  currentQuery = '';
  query = '';
  currentPage = 1;
  totalPages = 1;

  constructor(private searchService: SearchService, private cacheService: CacheService) {
    this.bookSearch = new FormControl('');

    this.searchService.pageEmitter.subscribe((pageNum: number) => {
      this.search(this.query, pageNum);
    });
  }

  trendingSubjects: Array<{ name: string }> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  search(query: string = this.currentQuery, page: number = 1) {
    this.errorMessage = '';
    this.isLoading = true;
    if (!this.currentQuery) {
      this.errorMessage = 'Search field is empty.';
      this.isLoading = false;
      return;
    }
    this.query = this.currentQuery;
    this.cachedResults = this.cacheService.getFromCache(this.query, page)?.docs || [];
    console.log(this.cachedResults);
    if (this.cachedResults.length > 0) {
      this.searchResults = this.cachedResults;
      this.currentPage = page;
      this.totalPages = Math.floor(this.cachedResults.length) + 1;
      this.isLoading = false;
      return;
    }
    this.searchService.getSearchResults(query, page).subscribe(
      (data) => {
        this.searchResults = data?.docs;
        if (data.numFound === 0) {
          this.errorMessage = `No results found for '${this.query}'`;
        }
        this.currentPage = page;
        this.totalPages = Math.floor(data.numFound / 10) + 1;
        this.isLoading = false;
        this.cacheService.addToCache(this.query, page, data);
      },
      (err) => {
        if (err.status === 404) {
          this.errorMessage = 'Resource not found';
        }
        this.errorMessage =
          'Request could not be completed! Please try again later.';
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  clearCurrentQuery() {
    this.currentQuery = '';
    this.bookSearch.setValue('');
  }

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .subscribe((value: string) => {
        this.errorMessage = '';
        this.currentQuery = value;
      });
  }
}
