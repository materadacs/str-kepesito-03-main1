import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  chosenBook = {title:"Lord of Rings", imgUrl:"https://images.unsplash.com/photo-1506466010722-395aa2bef877?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1488&q=80"};

  constructor() { }

  ngOnInit(): void {
  }

}
