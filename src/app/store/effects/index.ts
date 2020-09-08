import { Type } from '@angular/core';
import { FavoritesEffects } from './favorites.effects';
import { SearchImagesEffects } from './search.images.effects';

export const effects: Type<any>[] = [
    FavoritesEffects,
    SearchImagesEffects
];    
