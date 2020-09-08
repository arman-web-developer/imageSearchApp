import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';

import { ResponsiveGridTileDirective } from './directives/responsive-cols.directive';


const materialModules = [
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    MatListModule
]

const directives = [
    ResponsiveGridTileDirective
]

@NgModule({
    declarations: [
        ...directives,
    ],
    imports: [
        CommonModule,
        ...materialModules,
    ],
    exports: [
        ...materialModules,
        ...directives,
    ]
})
export class SharedModule { }
