import { Component, OnInit } from '@angular/core';

import { getImagesBySearch } from '../store/selectors/search.selector';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/state/state';
import { SearchImages } from '../store/actions/search.images.action';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AddToFavoriteListModalComponent } from '../add-to-favorite-list-modal/add-to-favorite-list-modal.component';
import { BaseComponent } from '../core/base-component.ts/base-component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { IUnsplashData } from '../core/models/unsplash.type';


@Component({
    selector: 'app-search-gallery',
    templateUrl: './search-gallery.component.html',
    styleUrls: ['./search-gallery.component.scss']
})
export class SearchGalleryComponent extends BaseComponent implements OnInit {

    public searchTerm: string;
    public images: IUnsplashData[];;
    private searchTermChanged: Subject<string> = new Subject<string>();

    constructor(
        private store$: Store<AppState>,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {

        super();

        this.searchTermChanged.pipe(
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

    public openAddToFavoriteListDialog = (selectedImage: string): void => {

        this.dialog.open(AddToFavoriteListModalComponent, {
            width: '400px',
            data: selectedImage
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
