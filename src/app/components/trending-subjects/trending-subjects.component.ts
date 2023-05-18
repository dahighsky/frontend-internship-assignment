import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';
import { CacheService } from 'src/app/core/services/cache.service';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {
  isLoading = true;

  subjectName = '';

  allBooks: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private subjectsService: SubjectsService
  ) {}

  getAllBooks() {
    const cachedResults = this.cacheService.getBookFromCache(this.subjectName, 1)?.works || [];
    if(cachedResults.length > 0){
      this.allBooks = cachedResults;
      this.isLoading = false;
      return;
    }
    this.subjectsService.getAllBooks(this.subjectName).subscribe((data) => {
      this.allBooks = data?.works;
      // this.subjectsArray = data;
      this.isLoading = false;
      this.cacheService.addBookToCache(this.subjectName, 1, data);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.isLoading = true;
      this.getAllBooks();
    });
  }
}
