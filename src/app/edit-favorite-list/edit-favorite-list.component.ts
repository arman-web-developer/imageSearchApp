
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state/state';
import { BaseComponent } from '../core/base-component.ts/base-component';
import { ApiService } from '../core/services/api.service';

@Component({
    selector: 'app-edit-favorite-list',
    templateUrl: './edit-favorite-list.component.html',
    styleUrls: ['./edit-favorite-list.component.scss']
})
export class EditFavoriteListComponent extends BaseComponent {


    constructor(
        public dialogRef: MatDialogRef<EditFavoriteListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string }) {
        super();
    }

    public cancel = (): void => {
        this.dialogRef.close();
    }

}

