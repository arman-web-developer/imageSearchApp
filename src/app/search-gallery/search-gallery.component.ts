import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../core/base-component.ts/base-component';
import { select, Store } from '@ngrx/store';
import { getImagesBySearch } from '../store/selectors/search.selector';
import { AppState } from '../store/state/state';
import { SearchImages } from '../store/actions/search.images.action';
import { MatDialog } from '@angular/material/dialog';
import { AddToFavoriteListModalComponent } from '../add-to-favorite-list-modal/add-to-favorite-list-modal.component';
import { IImage } from '../core/models/favorite.type';


@Component({
    selector: 'app-search-gallery',
    templateUrl: './search-gallery.component.html',
    styleUrls: ['./search-gallery.component.scss']
})
export class SearchGalleryComponent extends BaseComponent implements OnInit {


    searchTerm: string;
    searchTermChanged: Subject<string> = new Subject<string>();

    images;

    constructor(
        private store$: Store<AppState>,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog) {

        super();

        this.searchTermChanged.pipe(
            //|   filter((str)=> !!str.trim().length),
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe((value) => {
            if (value && !!value.trim().length) {
                this.store$.dispatch(SearchImages({ keyword: value }));
            }
        })
    }

    private openSnackBar = (): void => {
        this._snackBar.open('no results found', 'try again', {
            duration: 3000,
        });
    }



    openAddToFavoriteListDialog(selectedImage): void {

        const dialogRef = this.dialog.open(AddToFavoriteListModalComponent, {
            width: '400px',
            data: selectedImage
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        });
    }

    ngOnInit(): void {

        this.subscriptions.push(this.store$.pipe(select(getImagesBySearch())).subscribe(res => {
            if (res) {
                this.images = res['photos']['results']
                if (!this.images.length) {
                    this.openSnackBar()
                }
            }

        }));
    }

    public searchTermChange = (searchTerm: string): void => {
        this.searchTermChanged.next(searchTerm);
    }
}
