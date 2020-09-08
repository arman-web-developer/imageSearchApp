import { props, createAction, union } from '@ngrx/store';
import { IUnsplashData } from '../../core/models/unsplash.type';

export const SearchImages = createAction('[SearchImages] Search Images', props<{ keyword: string }>());
export const SearchImagesSuccess = createAction('[SearchImages] Search Images Success', props<{ payload: IUnsplashData[] }>());
export const SearchImagesFail = createAction('[SearchImages] Search Images Fail');

export const SearchImagesActionsAll = union({
    SearchImages,
    SearchImagesSuccess,
    SearchImagesFail
});

export type SearchImagesActionsUnion = typeof SearchImagesActionsAll;