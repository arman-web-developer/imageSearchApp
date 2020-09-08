import { FavoriteState } from '../reducers/favorites.reducer';
import { SearchImagesState } from '../reducers/search.images.reducer';

export interface AppState {
    favoriteList: FavoriteState;
    images: SearchImagesState
}
