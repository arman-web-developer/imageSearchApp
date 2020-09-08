import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/state/state';
import { LoadAllFavorites } from './store/actions/favorites.action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private store$: Store<AppState>) { }

    public selectedTabChange = (): void => {
        this.store$.dispatch(LoadAllFavorites());
    }
}
