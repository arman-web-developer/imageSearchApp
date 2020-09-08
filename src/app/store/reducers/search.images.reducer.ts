import * as SearchImagesActions from '../actions/search.images.action';
import { IUnsplashData } from '../../core/models/unsplash.type';

export interface SearchImagesState {
    images: IUnsplashData[];
}

export const initialState: SearchImagesState = {
    images: null,
};

export function SearchImagesReducer(state = initialState, action: SearchImagesActions.SearchImagesActionsUnion): SearchImagesState {
    switch (action.type) {
        case SearchImagesActions.SearchImages.type:

            return {
                ...state,
            }

        case SearchImagesActions.SearchImagesSuccess.type:
            return {
                ...state,
                images: action.payload,
            };

        case SearchImagesActions.SearchImagesFail.type:
            return {
                ...state
            }

        default: {
            return state;
        }
    }
}
