import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatTabsModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';

import { DefaultLoaderComponent } from './components/default-loader/default-loader.component';
import { AddBookmarkDirective } from './directives/add-bookmark/add-bookmark.directive';
import { LoaderService } from './services/loader/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DefaultLoaderComponent,
    AddBookmarkDirective,
    BookmarksComponent,
    BookmarksListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    // Inport Angular Material Modules - more than necessary
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,

    // Angular App Routing
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'bookmarks', component: BookmarksComponent }
    ]),
  ],
  providers: [
    LoaderService,

    // Implementing of LoaderInterceptor - for (Show, Hide) loader on every request
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
