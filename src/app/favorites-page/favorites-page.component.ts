import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/state/state';
import { BaseComponent } from '../core/base-component.ts/base-component';
import { geFavoritesList } from '../store/selectors/favorites.selector';

import { LoadAllFavorites, DeleteImageById, DeleteFavoriteListById, UpdateFavoriteListById } from '../store/actions/favorites.action';
import { MatDialog } from '@angular/material/dialog';
import { EditFavoriteListComponent } from '../edit-favorite-list/edit-favorite-list.component';
import { IFavorite } from '../core/models/favorite.type';

@Component({
    selector: 'app-favorites-page',
    templateUrl: './favorites-page.component.html',
    styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent extends BaseComponent implements OnInit {

    public favoritePageData: IFavorite[];

    constructor(private store$: Store<AppState>, public dialog: MatDialog, private apiService: ApiService) {
        super();
        this.store$.dispatch(LoadAllFavorites());
    }

    ngOnInit(): void {

        this.subscriptions.push(this.store$.pipe(select(geFavoritesList())).subscribe((favoriteData: IFavorite[]) => {
            if (favoriteData) {
                this.favoritePageData = favoriteData;
            }
        }));
    }

    public deleteImg = (id: string): void => {
        this.store$.dispatch(DeleteImageById({ id }));
    }

    public deleteFavoriteList = (id: string): void => {
        this.store$.dispatch(DeleteFavoriteListById({ id }));
    }

    public handleDownload = (img: HTMLImageElement): void => {
        this.apiService.downloadImage(img);
    }

    public openEditFavoriteListDialog = (selectedFavoriteListItem: IFavorite): void => {

        const dialogRef = this.dialog.open(EditFavoriteListComponent, {
            width: '350px',
            data: { title: selectedFavoriteListItem.title, description: selectedFavoriteListItem.description }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let payload: IFavorite = {
                    id: selectedFavoriteListItem.id,
                    title: result.title,
                    description: result.description
                };

                this.store$.dispatch(UpdateFavoriteListById({ payload }));
            }
        });
    }
}
