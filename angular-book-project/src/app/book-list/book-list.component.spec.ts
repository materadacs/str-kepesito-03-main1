import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '../service/http.service';

import {of} from 'rxjs';
import { BookListComponent } from './book-list.component';

describe('Book-List Komponens tesztelése', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  window.onbeforeunload = jasmine.createSpy();


  let mockHttpClient : {get: jasmine.Spy, put: jasmine.Spy};
  let httpMockService : HttpService;
  let mockServerMovieList = [];
  const readFirstBook =  { id: 1, title: "Don quixote", author: "Miguel de Cervantes", numberOfReaders: 478, category: "Adventure" };

  beforeEach(async () => {
     mockServerMovieList =   [
      { id: 1, title: "Don quixote", author: "Miguel de Cervantes", numberOfReaders: 477, category: "Adventure" },
      { id: 2, title: "Lord of the Rings", author: "J.R. Tolkien", numberOfReaders: 587, category: "Fantasy" },
      { id: 3, title: "Harry Potter and Sorcerers Stone", author: "J.K. Rowling", numberOfReaders: 325, category: "Adventure" },
      { id: 4, title: "And Then There Were None", author: "Agatha Christie", numberOfReaders: 655, category: "Crime" },
      { id: 5, title: "Love in the Time of Cholera", author: "Gabriel García Márquez", numberOfReaders: 147, category: "Romance" }

  ]
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    httpMockService = new HttpService(mockHttpClient as any);
    mockHttpClient.get.and.returnValue(of(mockServerMovieList));
    mockHttpClient.put.and.returnValue(of(readFirstBook))

    await TestBed.configureTestingModule({
      declarations: [ BookListComponent ],
      imports: [HttpClientModule],
      providers:[{provide: HttpService, useValue: httpMockService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Book-list komponens létrejön', () => {
    expect(component).toBeTruthy();
  });

  it('Kezdetben üres a tábla', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const tableAllRows = document.querySelectorAll('tr');
    const dataRowsByClassSelector = document.querySelectorAll('.table-row');
    expect(tableAllRows.length).toBeLessThan(2);
    expect(dataRowsByClassSelector.length).toBe(0);
  });

  it('A táblázat fejléce megfelelő', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const thElements = document.querySelectorAll('th');
    expect(thElements.length).toBe(5);

    expect(thElements[0].innerHTML).toBe('Title');
    expect(thElements[1].innerHTML).toBe('Author');
    expect(thElements[2].innerHTML).toBe('Number of readers');
    expect(thElements[3].innerHTML).toBe('Category');
  });

  it('A TH és SECTION elem SCSS szabályainak tesztelése', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const firstTHelement = compiledComponent.querySelectorAll('th')[0];
    const thStyle = window.getComputedStyle(firstTHelement);

    expect(thStyle.minWidth).toBe('150px');
    expect(thStyle.textAlign).toBe('center');
    expect(thStyle.padding).toBe('8px');
    expect(thStyle.backgroundColor).toBe('rgb(226, 78, 27)');
   // expect(thStyle.color).toBe('rgb(226, 197, 102)');
  })

  it('A SECTION elem SCSS szabályainak tesztelése', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;
    const sectionElement = compiledComponent.querySelector('.table-section');

    const sectionStyle = window.getComputedStyle(sectionElement);
    expect(sectionStyle.display).toBe('flex');
    expect(sectionStyle.flexDirection).toBe('column');
    expect(sectionStyle.alignItems).toBe('center');
  })

  it('GET kérés tesztelése, getBookList metódus meghívásakor felfrissül a helyi book lista', ()=> {

    // HttpService getHotelList metódus tesztelése
    httpMockService.getBookList().subscribe(
      (mockServerList)=> {
        expect(mockServerList).toBe(mockServerMovieList)
      },err => console.log(err)
    );

    // Hotel List komponens getHotels metódusa meghívja a service osztályt és frissiti a lokális listát
    component.getBookList();
    expect(component.bookList).toEqual(mockServerMovieList);
  });

  it('A Get Book List gomb kattintásakor megjelennek az adatok a tábla soraiban', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;
    const button: HTMLButtonElement = compiledComponent.querySelector('button');

    button.click();
    fixture.detectChanges();

    const dataRows = compiledComponent.querySelectorAll('.table-row');
    expect(dataRows.length).toBe(5);

    const firstRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(1) td');
    expect(firstRow[0].innerHTML).toBe('Don quixote');
    expect(firstRow[1].innerHTML).toBe('Miguel de Cervantes');
    expect(firstRow[3].innerHTML).toBe('Adventure');

    const thirdRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(3) td');
    expect(thirdRow[0].innerHTML).toBe('Harry Potter and Sorcerers Stone');
    expect(thirdRow[1].innerHTML).toBe('J.K. Rowling');
    expect(thirdRow[3].innerHTML).toBe('Adventure');


    const fifthRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(5) td');
    expect(fifthRow[0].innerHTML).toBe('Love in the Time of Cholera');
    expect(fifthRow[1].innerHTML).toBe('Gabriel García Márquez');
    expect(fifthRow[3].innerHTML).toBe('Romance');

  });

  it('A Get Book List gombra kattintva megjelenik 5db Read gomb is', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const button: HTMLButtonElement = compiledComponent.querySelector('button');
    button.click();
    fixture.detectChanges();

    const readButtons: HTMLCollectionOf<HTMLButtonElement> = compiledComponent.querySelectorAll('.table-row button');
    expect(readButtons[0]).toBeTruthy();
    expect(readButtons[0].innerHTML).toBe('Read');

    expect(readButtons[1]).toBeTruthy();
    expect(readButtons[1].innerHTML).toBe('Read');

    expect(readButtons[2]).toBeTruthy();
    expect(readButtons[3].innerHTML).toBe('Read');

    expect(readButtons[3]).toBeTruthy();
    expect(readButtons[3].innerHTML).toBe('Read');

    expect(readButtons[4]).toBeTruthy();
    expect(readButtons[4].innerHTML).toBe('Read');
  });

  it('PUT metódus, új GET hívás ismételt hívásának tesztelése', ()=> {
    const bookId = 1;
    const readBookObj =  { id: 1, title: "Don quixote", author: "Miguel de Cervantes", numberOfReaders: 478, category: "Adventure" };

    // HttpService deleteMovie metódus tesztelése
    httpMockService.readABook(bookId, readBookObj).subscribe(
      (response)=> { expect(response).toEqual(readFirstBook); },
      err => console.log(err)
    );

  // Book-List komponens readBook meghivása meghívja-e a getHívást megint
  const clickedBookObject = { id: 1, title: "Don quixote", author: "Miguel de Cervantes", numberOfReaders: 477, category: "Adventure" }
  component.readBook(clickedBookObject);

  expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  expect(mockHttpClient.put).toHaveBeenCalledBefore(mockHttpClient.get);
  })

  it('A Read gombra történő kattintás meghívja a service-t', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const getMovieButton = compiledComponent.querySelector('button');
    getMovieButton.click();
    fixture.detectChanges();

    const allButtons = compiledComponent.querySelectorAll('button');

    const thirdButton = allButtons[3];
    thirdButton.click();
    fixture.detectChanges();
    
    expect(mockHttpClient.put).toHaveBeenCalled();
  })
});


