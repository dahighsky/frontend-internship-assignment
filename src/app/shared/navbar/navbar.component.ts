import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'front-end-internship-assignment-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{
  bookSearch: FormControl;
  errorMessage = '';

  constructor() {
    this.bookSearch = new FormControl('');
  }
  trendingSubjects: Array<{ index: number, name: string }> = [
    { index: 2, name: 'JavaScript' },
    { index: 3,name: 'CSS' },
    { index: 4,name: 'HTML' },
    { index: 5,name: 'Harry Potter' },
    { index: 6,name: 'Crypto' },
  ];
  
  navButtonClick(key: number) {
    const navList = document.querySelectorAll('.nav-list-item')
    navList.forEach((element, index) => {
      if (index === key) {        
        navList[0].classList.remove('active');
        element.classList.add('active');
        console.log(element);
      } else {  
        element.classList.remove('active');        
        console.log(index, key);
      }
    });
  }

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .subscribe((value: string) => {
        this.errorMessage = '';
      });
  }
}
