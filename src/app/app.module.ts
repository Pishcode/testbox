import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { BooksComponent } from './books/books.component';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserComponent } from './components/user/user.component';
import { AuthService } from './shared/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './shared/store/app.reducer';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookService } from './shared/services/book.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AddBookComponent } from './books/add-book/add-book.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { ReviewFormComponent } from './review/review-form/review-form.component';
import { ReviewService } from './shared/services/review.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './shared/store/auth/auth.effects';
import { CartComponent } from './cart/cart.component';
import { ShortenPipe } from './shared/pipes/shorten.pipe';
import { MoneyPipe } from './shared/pipes/money.pipe';
import { AuthorsComponent } from './components/authors/authors.component';
import { AddAuthorComponent } from './components/authors/add-author/add-author.component';
import { AuthorDetailComponent } from './components/authors/author-detail/author-detail.component';
import { EditAuthorComponent } from './components/authors/edit-author/edit-author.component';

@NgModule({
    declarations: [
        AppComponent,
        BooksComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        SideNavComponent,
        BookDetailComponent,
        AddBookComponent,
        EditBookComponent,
        ReviewFormComponent,
        ShortenPipe,
        MoneyPipe,
        CartComponent,
        AuthorsComponent,
        AddAuthorComponent,
        AuthorDetailComponent,
        EditAuthorComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot([AuthEffects]),
        BrowserModule,
        AppRoutingModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatBadgeModule,
        MatCardModule,
        MatGridListModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatAutocompleteModule,
        MatTableModule,
        MatListModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
        ReviewService,
        BookService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
