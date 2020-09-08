import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as  FavoriteActions from '../actions/favorites.action';
import { ApiService } from '../../core/services/api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/state';

@Injectable()
export class FavoritesEffects {

    constructor(
        private actions$: Actions<FavoriteActions.FavoriteActionsUnion>,
        private store$: Store<AppState>,
        private apiService: ApiService
    ) { }

    @Effect()
    $getAllFavorites = this.actions$.pipe(
        ofType(FavoriteActions.LoadAllFavorites.type),
        mergeMap(() => this.apiService.getAllFavorites().pipe(
            map(response => FavoriteActions.LoadAllFavoritesSuccess({ payload: response })),
            catchError(() => of(FavoriteActions.LoadAllFavoritesFail()))
        ))
    );

    @Effect()
    $createFavorite = this.actions$.pipe(
        ofType(FavoriteActions.AddFavoriteList.type),
        mergeMap(action => this.apiService.createFavoriteList(action.payload).pipe(
            map(response => {
                this.store$.dispatch(FavoriteActions.LoadAllFavorites());
                this.apiService.addImageInFavoriteListById(response.id, { imgPath: action.imgId }).subscribe((res) => {
                })

                return FavoriteActions.AddFavoriteListSuccess({ payload: response })
            }),
            catchError(() => of(FavoriteActions.AddFavoriteListFail()))
        ))
    );

    @Effect()
    $editFavoriteById = this.actions$.pipe(
        ofType(FavoriteActions.UpdateFavoriteListById.type),
        mergeMap(action => this.apiService.updateFavoriteListById(action.payload).pipe(
            map(response => {
                this.store$.dispatch(FavoriteActions.LoadAllFavorites());
                return FavoriteActions.UpdateFavoriteListByIdSuccess({ payload: response })
            }),
            catchError((response) => of(FavoriteActions.UpdateFavoriteListByIdFail({ payload: response })))
        ))
    );

    @Effect()
    $deleteFavoriteById = this.actions$.pipe(
        ofType(FavoriteActions.DeleteFavoriteListById.type),
        mergeMap(action => this.apiService.deleteFavoriteListById(action.id).pipe(
            map(response => {
                this.store$.dispatch(FavoriteActions.LoadAllFavorites());
                return FavoriteActions.DeleteFavoriteListByIdSuccess({ payload: response })
            }),
            catchError((response) => of(FavoriteActions.DeleteFavoriteListByIdFail({ payload: response })))
        ))
    );

    @Effect()
    $deleteImageById = this.actions$.pipe(
        ofType(FavoriteActions.DeleteImageById.type),
        mergeMap(action => this.apiService.deleteImageById(action.id).pipe(
            map(response => {
                this.store$.dispatch(FavoriteActions.LoadAllFavorites());
                return FavoriteActions.DeleteImageByIdSuccess({ payload: response })
            }),
            catchError((response) => of(FavoriteActions.DeleteImageByIdFail({ payload: response })))
        ))
    );
    @Effect()
    $addImageInFavoriteListById = this.actions$.pipe(
        ofType(FavoriteActions.AddImageInFavoriteListById.type),
        mergeMap(action => this.apiService.addImageInFavoriteListById(action.favoriteListId, action.payload).pipe(
            map(() => {
                this.store$.dispatch(FavoriteActions.LoadAllFavorites());
                action.callback();
                return FavoriteActions.AddImageInFavoriteListByIdSuccess()
            }),
            catchError(() => of(FavoriteActions.AddImageInFavoriteListByIdFail()))
        ))
    );
}