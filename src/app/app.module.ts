import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { BooksComponent } from './books/books.component';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserComponent } from './user/user.component';
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
        CartComponent
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
