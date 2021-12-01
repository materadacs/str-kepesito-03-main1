import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL = 'http://localhost:3000/books';

  constructor(undefined) { }

  getBookList():any{}

  readABook(id, book):any{}
}
