import { props, createAction, union } from '@ngrx/store';
import { IFavorite } from '../../core/models/favorite.type';

export const LoadAllFavorites = createAction('[Favorites] Load All Favorites');
export const LoadAllFavoritesSuccess = createAction('[Favorites] Load All Favorites Success', props<{ payload: IFavorite[] }>());
export const LoadAllFavoritesFail = createAction('[Favorites] Load All Favorites Fail');

export const AddFavoriteList = createAction('[Favorites] Add Favorite List', props<{ payload: IFavorite, imgId: string }>());
export const AddFavoriteListSuccess = createAction('[Favorites] Add Favorite List Success', props<{ payload: IFavorite }>());
export const AddFavoriteListFail = createAction('[Favorites] Add Favorite List Fail');

export const UpdateFavoriteListById = createAction('[Favorites] Update Favorite List By Id', props<{ payload: IFavorite }>());
export const UpdateFavoriteListByIdSuccess = createAction('[Favorites] Update Favorite List By IdSuccess', props<{ payload: IFavorite }>());
export const UpdateFavoriteListByIdFail = createAction('[Favorites] Update Favorite List By Id Fail', props<{ payload: IFavorite }>());

export const DeleteFavoriteListById = createAction('[Favorites] Delete Favorite List By Id', props<{ id: string }>());
export const DeleteFavoriteListByIdSuccess = createAction('[Favorites] Delete Favorite List By Id Success', props<{ payload: IFavorite }>());
export const DeleteFavoriteListByIdFail = createAction('[Favorites] Delete Favorite List By Id Fail', props<{ payload: IFavorite }>());

export const DeleteImageById = createAction('[Favorites] Delete Image By Id', props<{ id: string }>());
export const DeleteImageByIdSuccess = createAction('[Favorites] Delete Image By Id Success', props<{ payload: IFavorite }>());
export const DeleteImageByIdFail = createAction('[Favorites] Delete Image By Id Fail', props<{ payload: IFavorite }>());

export const AddImageInFavoriteListById = createAction('[Favorites] Add Image In Favorite List By Id', props<{ favoriteListId: string, payload: { imgPath: string }, callback?: Function }>());
export const AddImageInFavoriteListByIdSuccess = createAction('[Favorites] Add Image In Favorite List Id Success');
export const AddImageInFavoriteListByIdFail = createAction('[Favorites] Add Image In Favorite List By Id Fail');

export const FavoriteActionsAll = union({
    LoadAllFavorites,
    LoadAllFavoritesSuccess,
    LoadAllFavoritesFail,

    AddFavoriteList,
    AddFavoriteListSuccess,
    AddFavoriteListFail,

    UpdateFavoriteListById,
    UpdateFavoriteListByIdSuccess,
    UpdateFavoriteListByIdFail,

    DeleteFavoriteListById,
    DeleteFavoriteListByIdSuccess,
    DeleteFavoriteListByIdFail,

    DeleteImageById,
    DeleteImageByIdSuccess,
    DeleteImageByIdFail,

    AddImageInFavoriteListById,
    AddImageInFavoriteListByIdSuccess,
    AddImageInFavoriteListByIdFail
});

export type FavoriteActionsUnion = typeof FavoriteActionsAll;