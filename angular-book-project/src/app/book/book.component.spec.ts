import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { BookComponent } from './book.component';

describe('Book Komponens elemeinek tesztelése', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  window.onbeforeunload = jasmine.createSpy();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Létrejön a Book Komponens', () => {
    expect(component).toBeTruthy();
  });

  it('Label elemek megfelelő szöveggel léteznek', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const titleLabel = compiledComponent.querySelector('label[for="title"]');
    const yearLabel = compiledComponent.querySelector('label[for="author"]');
    const categoryLabel = compiledComponent.querySelector('label[for="category"]');

    //Elemek léteznek:
    expect(titleLabel).toBeTruthy();
    expect(yearLabel).toBeTruthy();
    expect(categoryLabel).toBeTruthy();

    //Belső szöveges tartalom:
    expect(titleLabel.innerHTML).toBe('Title:');
    expect(yearLabel.innerHTML).toBe('Author:');
    expect(categoryLabel.innerHTML).toBe('Category:');
  });
  
  it('Input, Select elemek megfelelően léteznek', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const titleInput: HTMLInputElement = compiledComponent.querySelectorAll('input[type="text"]')[0];
    const authorInput: HTMLInputElement = compiledComponent.querySelectorAll('input[type="text"]')[1];
    const selectElement: HTMLSelectElement = compiledComponent.querySelector('select');

    //Elemek léteznek:
    expect(titleInput).toBeTruthy();
    expect(authorInput).toBeTruthy();
    expect(selectElement).toBeTruthy();
  });

  it('Mentés gomb és Small elem létezésének tesztelése', ()=> {
    const compiledComponent  = fixture.debugElement.nativeElement;

    const button: HTMLButtonElement = compiledComponent.querySelector('button');
    const smallElement = compiledComponent.querySelector('small');

    expect(button).toBeTruthy();
    expect(button.innerHTML).toBe('Save New Book');
    expect(smallElement).toBeTruthy();
    expect(smallElement.innerHTML).toBe('Fill all field to save!')
  })

  it('Bootstrap klasszok használata a form elemekre', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const bootsrapContainer = compiledComponent.querySelector('.container-md');
    const bootsrapLabel = compiledComponent.querySelectorAll('.form-label');
    const bootsrapFormControls = compiledComponent.querySelectorAll('.form-control');
    const bootsrapSelect = compiledComponent.querySelector('.form-select');
    const bootsrapeButton = compiledComponent.querySelector('.btn-success');

    expect(bootsrapContainer).toBeTruthy();
    expect(bootsrapLabel.length).toBe(3);
    expect(bootsrapFormControls.length).toBe(2);
    expect(bootsrapSelect).toBeTruthy();
    expect(bootsrapeButton).toBeTruthy();
  })

  it('Bootstrap klasszok használata színekre', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const labelElements: HTMLCollectionOf<HTMLLabelElement> = compiledComponent.querySelectorAll('label');

    const firstLabelClassList = labelElements[0].classList;
    const secondLabelClassList = labelElements[1].classList;
    const thirdLabelClassList = labelElements[2].classList;

    expect(firstLabelClassList.contains('text-dark')).toBeTrue();
    expect(secondLabelClassList.contains('text-dark')).toBeTrue();
    expect(thirdLabelClassList.contains('text-dark')).toBeTrue();

    const smallElement: HTMLElement = compiledComponent.querySelector('small');
    expect(smallElement).toBeTruthy();
    expect(smallElement.classList.contains('text-danger')).toBeTrue();
  })

  it('Az űrlap konténerének alap CSS beállításának ellenőrzése', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const containerElement: HTMLElement = compiledComponent.querySelector('section');
    const containerStyles = window.getComputedStyle(containerElement);

    expect(containerStyles.backgroundColor).toBe('rgb(241, 216, 207)');
    expect(containerStyles.borderRadius).toBe('12px');
    expect(containerStyles.border).toBe('2px solid rgb(226, 78, 27)');
  })

});

describe('Book űrlap validátor tesztjei', ()=> {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  window.onbeforeunload = jasmine.createSpy();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Book Title beviteli mező validálása', ()=> {
    const titleControl = component.bookForm.controls.title;
    expect(titleControl.valid).toBeFalsy();

    titleControl.setValue('H');
    expect(titleControl.valid).toBeFalsy();

    titleControl.setValue('Nagyon-nagyon-nagyon-nagyon hosszú cím');
    expect(titleControl.valid).toBeFalsy();

    //Helyes beviteli mező esetén:
    titleControl.setValue("Háború és Béke");
    expect(titleControl.valid).toBeTruthy();
  })

  it('Author beviteli mező validálása', ()=> {
    const authorControl = component.bookForm.controls.author
    expect(authorControl.valid).toBeFalsy();

    authorControl.setValue('TM');
    expect(authorControl.valid).toBeFalsy();

    authorControl.setValue('Thomas Man12');
    expect(authorControl.valid).toBeFalsy();

    authorControl.setValue('Thomas Man**');
    expect(authorControl.valid).toBeFalsy();

    authorControl.setValue('Thomas Man');
    expect(authorControl.valid).toBeTruthy();
  })

  it('Kategória választás validálása', ()=> {
    const categoryControl = component.bookForm.controls.category;
    expect(categoryControl.valid).toBeFalsy();

    categoryControl.setValue('Fantasy');
    expect(categoryControl.valid).toBeTruthy();
  })

  it('Ha minden mező valid akkor a form is valid', ()=> {
    expect(component.bookForm.valid).toBeFalsy();

    const titleControl = component.bookForm.controls.title;
    const authorControl = component.bookForm.controls.author;
    const categoryControl = component.bookForm.controls.category;

    titleControl.setValue('Hotel Budapest');
    authorControl.setValue('Luc Gizi');
    categoryControl.setValue('Romance');
    expect(component.bookForm.valid).toBeTruthy();
  })

  it('A Save New Book gomb csak akkor kattintható, ha valid a form', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    // Kezdetben minden invalid
    const saveButton = compiledComponent.querySelector('button');
    expect(saveButton.disabled).toBeTruthy();

    const titleControl = component.bookForm.controls.title;
    const authorControl = component.bookForm.controls.author;
    const categoryControl = component.bookForm.controls.category;

    titleControl.setValue('Hotel Budapest');
    authorControl.setValue('Luc Gizi');
    categoryControl.setValue('Romance');

    fixture.detectChanges();

    expect(saveButton.disabled).toBeFalsy();
  });

  it('A saveBook metódus meghívódik, ha rátudnak kattintani a gombra', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;
    const saveButton = compiledComponent.querySelector('button');

    const mosckSaveFunction = spyOn(component, 'saveBook');

    //Kezdetben nem lehet kattintható, nem hívódhat meg
    saveButton.click();
    expect(mosckSaveFunction).not.toHaveBeenCalled();

    // Valós értékeket veszünk fel, kattintható a gomb
    
    const titleControl = component.bookForm.controls.title;
    const authorControl = component.bookForm.controls.author;
    const categoryControl = component.bookForm.controls.category;

    titleControl.setValue('Hotel Budapest');
    authorControl.setValue('Luc Gizi');
    categoryControl.setValue('Romance');

    fixture.detectChanges();

    saveButton.click();
    expect(mosckSaveFunction).toHaveBeenCalledTimes(1);
  })

  it('A saveBook metódus visszaadja a form értékeit', ()=> {
    const bookForm = component.bookForm;

    bookForm.controls.title.setValue('Hotel Budapest');
    bookForm.controls.author.setValue('Luc Gizi');
    bookForm.controls.category.setValue('Romance');

    const bookObject = component.saveBook();
    expect(bookObject.title).toBe('Hotel Budapest');
    expect(bookObject.author).toBe('Luc Gizi');
    expect(bookObject.category).toBe('Romance');
  });

})
