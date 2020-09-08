import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/state';
import { FavoriteReducer } from './favorites.reducer';
import { SearchImagesReducer } from './search.images.reducer';

export const reducers: ActionReducerMap<AppState> = {
    favoriteList: FavoriteReducer,
    images: SearchImagesReducer,
};
