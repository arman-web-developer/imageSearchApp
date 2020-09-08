import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IImage, IFavorite } from '../core/models/favorite.type';
import { IUnsplashImage } from '../core/models/unsplash.type';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state/state';
import { LoadAllFavorites, AddFavoriteList, AddImageInFavoriteListById } from '../store/actions/favorites.action';
import { BaseComponent } from '../core/base-component.ts/base-component';
import { geFavoritesList } from '../store/selectors/favorites.selector';
import { ApiService } from '../core/services/api.service';

@Component({
    selector: 'app-add-to-favorite-list-modal',
    templateUrl: './add-to-favorite-list-modal.component.html',
    styleUrls: ['./add-to-favorite-list-modal.component.scss']
})
export class AddToFavoriteListModalComponent extends BaseComponent implements OnInit {

    public favoriteLists: IFavorite[];
    public title: string;
    public description: string;

    constructor(
        private apiService: ApiService,
        public dialogRef: MatDialogRef<AddToFavoriteListModalComponent>,
        private store$: Store<AppState>,
        @Inject(MAT_DIALOG_DATA) public data: string) {
        super();

        this.store$.dispatch(LoadAllFavorites());
    }

    ngOnInit(): void {
        this.subscriptions.push(this.store$.pipe(select(geFavoritesList())).subscribe(res => {
            if (res) {
                this.favoriteLists = res;
            }
        }));
    }

    public moveTotheList = (selectedList) => {
        const payload = {
            imgPath: this.data
        }
        this.store$.dispatch(AddImageInFavoriteListById({
            favoriteListId: selectedList.id, payload, callback: () => {
                this.cancel()
            }
        }));
    }

    public addFavoriteList = () => {

        let req: IFavorite = {
            title: this.title,
            description: this.description,
        }
        this.store$.dispatch(AddFavoriteList({ payload: req, imgId: this.data }));
        this.cancel()
    }

    public cancel = (): void => {
        this.dialogRef.close();
    }

}
