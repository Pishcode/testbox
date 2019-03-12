import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { CartComponent } from './cart/cart.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AddAuthorComponent } from './components/authors/add-author/add-author.component';
import { AuthorDetailComponent } from './components/authors/author-detail/author-detail.component';
import { EditAuthorComponent } from './components/authors/edit-author/edit-author.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'books', component: BooksComponent},
    {path: 'books/add', component: AddBookComponent, canActivate: [AuthGuardService]},
    {path: 'book/:id', component: BookDetailComponent},
    {path: 'book/edit/:id', component: EditBookComponent, canActivate: [AuthGuardService]},
    {path: 'authors', component: AuthorsComponent},
    {path: 'authors/add', component: AddAuthorComponent, canActivate: [AuthGuardService]},
    {path: 'author/:id', component: AuthorDetailComponent},
    {path: 'author/edit/:id', component: EditAuthorComponent, canActivate: [AuthGuardService]},
    {path: 'login', component: LoginComponent},
    {path: 'cart', component: CartComponent},
    {path: 'register', component: RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
