import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import * as  SearchImagesActions from '../actions/search.images.action';
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class SearchImagesEffects {

    constructor(
        private actions$: Actions<SearchImagesActions.SearchImagesActionsUnion>,
        private apiService: ApiService
    ) { }

    @Effect()
    $getAllSearchImages = this.actions$.pipe(
        ofType(SearchImagesActions.SearchImages.type),
        switchMap(action => this.apiService.getImagesBySearch(action.keyword).pipe(
            map(response =>  SearchImagesActions.SearchImagesSuccess({ payload: response })),
            catchError(() => of(SearchImagesActions.SearchImagesFail()))
        ))
    );
}