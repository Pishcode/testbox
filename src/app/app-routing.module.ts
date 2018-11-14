import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BooksComponent} from './books/books.component';
import {BookComponent} from './books/book/book.component';
import {LoginComponent} from './login/login.component';

const routes: Routes =  [
    { path: '', component: HomeComponent },
    { path: 'books', component: BooksComponent },
    { path: 'book/:id', component: BookComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
