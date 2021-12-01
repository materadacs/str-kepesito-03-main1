import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';

import { AppComponent } from '../app.component';
import { BookDetailsComponent } from './book-details.component';

describe('Book-Details Komponens tesztjei', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  window.onbeforeunload = jasmine.createSpy();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent, BookDetailsComponent ]
    }).overrideComponent(BookDetailsComponent, {set: {changeDetection: ChangeDetectionStrategy.Default}})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('A Book-Details komponens létrejön', () => {
    expect(component).toBeTruthy();
  });

  it('Adatkötések tesztelése', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const imgElement : HTMLImageElement = compiledComponent.querySelector('img');
    const h3Element: HTMLHeadingElement = compiledComponent.querySelector('h3');
    
    expect(imgElement).toBeTruthy();
    expect(h3Element).toBeTruthy();

    expect(imgElement.src).toBe('https://images.unsplash.com/photo-1506466010722-395aa2bef877?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1488&q=80');
    expect(h3Element.innerHTML).toBe('Lord of Rings');
  });

  it('A chosenBook mező változása estén frissülnek az HTML elemek megjelenítése', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const imgElement : HTMLImageElement = compiledComponent.querySelector('img');
    const h3Element: HTMLHeadingElement = compiledComponent.querySelector('h3');

    component.chosenBook = {title:"Planet of Avatar", imgUrl:"https://images.unsplash.com/photo-1499343162160-cd1441923dd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"};
    fixture.detectChanges();

    expect(imgElement.src).toBe('https://images.unsplash.com/photo-1499343162160-cd1441923dd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    expect(h3Element.innerHTML).toBe('Planet of Avatar');
  });

  it('A Detail kártya CSS tartalmának ellenőrzése', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const cardElement: HTMLElement = compiledComponent.querySelector('.card');
    const cardStyle = window.getComputedStyle(cardElement);

    expect(cardStyle.width).toBe('650px');
    expect(cardStyle.padding).toBe('16px');
  });

  it('A kép, H3 elem CSS szabályainak ellenőrzése', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const imgElement: HTMLImageElement = compiledComponent.querySelector('img');
    const h3Element: HTMLHeadingElement = compiledComponent.querySelector('h3');

    const imgStyle = window.getComputedStyle(imgElement);
    const h3ElementStyle = window.getComputedStyle(h3Element);

    expect(h3ElementStyle.color).toBe('rgb(226, 78, 27)');
    expect(h3ElementStyle.textAlign).toBe('center');
  })
});


