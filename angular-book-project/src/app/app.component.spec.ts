import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ChangeDetectionStrategy } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  window.onbeforeunload = jasmine.createSpy();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, BookDetailsComponent, BookListComponent, BookComponent
      ],imports: [
        HttpClientModule, ReactiveFormsModule
      ]
    }).overrideComponent(BookDetailsComponent, {set: {changeDetection: ChangeDetectionStrategy.Default}}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Létre kell jönnie az app Komponensnek', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app).toBeTruthy();
  });

  it('A Change Book gomboknál kattintáskor meg kell hívódni a changeBook metódusnak', ()=> {
    const mockChangeFunction = spyOn(component, 'changeBook');

    const compiledComponent = fixture.debugElement.nativeElement;
    const changeButton: HTMLButtonElement = compiledComponent.querySelector('#change-button');

    changeButton.click();
    expect(mockChangeFunction).toHaveBeenCalled();
    expect(mockChangeFunction).toHaveBeenCalledTimes(1);
  });

  it('A Change Book gombnál kattintásra meg kell változnia a kártya elemnek', ()=> {
    fixture.detectChanges();
    const compiledComponent = fixture.debugElement.nativeElement;

    const h3Element: HTMLHeadingElement = compiledComponent.querySelector('h3');
    const imgageElement: HTMLImageElement = compiledComponent.querySelector('img');

    expect(h3Element).toBeTruthy();
    expect(h3Element.innerHTML).toBe('Lord of Rings');

    const actionButton: HTMLButtonElement = compiledComponent.querySelector('#change-button');
    expect(actionButton).toBeTruthy();

    actionButton.click();
    fixture.detectChanges();

    expect(h3Element.innerHTML).toBe('Planet of Avatar');
    expect(imgageElement.src).toBe('https://images.unsplash.com/photo-1499343162160-cd1441923dd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  })

});
