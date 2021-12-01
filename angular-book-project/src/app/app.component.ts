import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  bookList = [
    {title:"Lord of Rings", imgUrl:"https://images.unsplash.com/photo-1506466010722-395aa2bef877?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1488&q=80"},
    {title:"Planet of Avatar", imgUrl:"https://images.unsplash.com/photo-1499343162160-cd1441923dd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"},
    {title:"Once Upon a Time in the West", imgUrl:"https://images.unsplash.com/photo-1460129105763-a10bea1ccc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80"}
  ];

  actualIndex = 0;
  actualBook = this.bookList[this.actualIndex];

  constructor(){}

  changeBook(){}
  
}
