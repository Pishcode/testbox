import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { BooksComponent } from './books/books.component';
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
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
import { reducers } from './shared/store/app.reducer';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import {BookService} from './shared/services/book.service';

@NgModule({
    declarations: [
        AppComponent,
        BooksComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        SideNavComponent,
        BookDetailComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        StoreModule.forRoot(reducers),
        BrowserModule,
        AppRoutingModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatListModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
        BookService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
