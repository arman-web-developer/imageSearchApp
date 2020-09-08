import * as FavoriteActions from '../actions/favorites.action';
import { IFavorite } from '../../core/models/favorite.type';

export interface FavoriteState {
    favoriteList: IFavorite[];
}

export const initialState: FavoriteState = {
    favoriteList: null,
};

export function FavoriteReducer(state = initialState, action: FavoriteActions.FavoriteActionsUnion): FavoriteState {
    let updatedFavorites: IFavorite[];

    switch (action.type) {
        case FavoriteActions.LoadAllFavorites.type:
        case FavoriteActions.AddFavoriteList.type:
        case FavoriteActions.UpdateFavoriteListById.type:
        case FavoriteActions.DeleteFavoriteListById.type:
        case FavoriteActions.DeleteImageById.type:
        case FavoriteActions.AddImageInFavoriteListById.type:
            return {
                ...state,
            }

        case FavoriteActions.LoadAllFavoritesFail.type:
            return {
                ...state,
            }


        case FavoriteActions.LoadAllFavoritesSuccess.type:
            return {
                ...state,
                favoriteList: [...action.payload],
            };

        case FavoriteActions.AddFavoriteListSuccess.type:
            if (state.favoriteList.find((favoriteItem) => favoriteItem.id === action.payload.id)) {
                return state;
            }
            return {
                ...state,
                favoriteList: [action.payload, ...state.favoriteList],
            };

        case FavoriteActions.UpdateFavoriteListByIdSuccess.type:
            updatedFavorites = state.favoriteList
                .map((favoriteItem: IFavorite) => favoriteItem.id === action.payload.id ? action.payload : favoriteItem);
            return {
                ...state,
                favoriteList: updatedFavorites
            }

        case FavoriteActions.DeleteFavoriteListByIdSuccess.type:
        case FavoriteActions.DeleteFavoriteListByIdFail.type:
        case FavoriteActions.AddFavoriteListFail.type:
        case FavoriteActions.UpdateFavoriteListByIdFail.type:
        case FavoriteActions.DeleteImageByIdSuccess.type:
        case FavoriteActions.DeleteImageByIdFail.type:
        case FavoriteActions.AddImageInFavoriteListByIdSuccess.type:
        case FavoriteActions.AddImageInFavoriteListByIdFail.type:
            return {
                ...state
            }

        default: {
            return state;
        }
    }
}
