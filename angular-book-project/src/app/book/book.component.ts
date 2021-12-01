import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.bookForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      author: new FormControl('', [Validators.required,  Validators.minLength(5), Validators.maxLength(30)]),
      category: new FormControl('', [Validators.required])
    })
  };
  saveBook(): any{
    console.log(this.bookForm);
  };
  selectCategory(event): void {
    this.bookForm.patchValue({
      category: event.target.value
    })
  };
}
