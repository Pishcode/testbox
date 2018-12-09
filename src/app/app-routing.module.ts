import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import {AddBookComponent} from './books/add-book/add-book.component';
import {EditBookComponent} from './books/edit-book/edit-book.component';

const routes: Routes =  [
    { path: '', component: HomeComponent },
    { path: 'books', component: BooksComponent },
    { path: 'books/add', component: AddBookComponent, canActivate: [AuthGuardService] },
    { path: 'book/:id', component: BookDetailComponent },
    { path: 'book/edit/:id', component: EditBookComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
