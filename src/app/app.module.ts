import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchGalleryComponent } from './search-gallery/search-gallery.component';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { FavoritesEffects } from './store/effects/favorites.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { SearchImagesEffects } from './store/effects/search.images.effects';
import { AddToFavoriteListModalComponent } from './add-to-favorite-list-modal/add-to-favorite-list-modal.component';
import { EditFavoriteListComponent } from './edit-favorite-list/edit-favorite-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchGalleryComponent,
    FavoritesPageComponent,
    AddToFavoriteListModalComponent,
    EditFavoriteListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([FavoritesEffects, SearchImagesEffects]),
    StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
