import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state/state';
import { SearchImagesState } from '../reducers/search.images.reducer';

export const selectSearchImageState = createFeatureSelector<AppState, SearchImagesState>('images');

export const getImagesBySearch = () => createSelector(selectSearchImageState, state => state.images);
