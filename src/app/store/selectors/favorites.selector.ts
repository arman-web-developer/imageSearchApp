import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state/state';
import { FavoriteState } from '../reducers/favorites.reducer';

export const selectFavoriteListState = createFeatureSelector<AppState, FavoriteState>('favoriteList');

export const geFavoritesList = () => createSelector(selectFavoriteListState, state => state.favoriteList);
