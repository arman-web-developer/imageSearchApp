import {
    Directive,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatGridTile } from '@angular/material/grid-list';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable'

export interface ResponsiveColumnsMap {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

// Usage: <mat-grid-tile [responsiveGridTile]="{xs: 1, sm: 2, md: 2, lg: 3, xl: 6}">
@Directive({
    selector: '[responsiveGridTile]'
})
export class ResponsiveGridTileDirective implements OnInit, OnDestroy {
    asyncValue: Observable<any[]>;

    private static readonly DEFAULT_COLUMNS_MAP: ResponsiveColumnsMap = {
        xs: 1,
        sm: 2,
        md: 4,
        lg: 6,
        xl: 12
    };

    @Input() private responsiveGridTile: ResponsiveColumnsMap;

    private readonly watchers: Subscription[] = [];

    constructor(private readonly tile: MatGridTile,
        private readonly mediaObserver: MediaObserver) {
        
    }

    ngOnInit(): void {
        this.responsiveGridTile = this.responsiveGridTile || ResponsiveGridTileDirective.DEFAULT_COLUMNS_MAP;

        this.initializeColsCount();

        const mediaWatcher = this.mediaObserver.asObservable()
            .pipe(
                map(changes => {
                    const matchingAliases = changes.map(change => this.mapAlias(change.mqAlias))
                        // sort by number of columns desc
                        .sort((a, b) => this.responsiveGridTile[b] - this.responsiveGridTile[a])
                        // doublecheck
                        .filter(alias => Object.keys(this.responsiveGridTile).includes(alias))
                        // triplecheck
                        .filter(alias => this.mediaObserver.isActive(alias));

                    const matchedAlias = matchingAliases.length > 0
                        ? matchingAliases[0]     // take the first matching alias (most cols)
                        : 'xs';                    // default to xs

                    return this.responsiveGridTile[matchedAlias];
                })
            ).subscribe(cols => this.tile.colspan = cols);

        this.watchers.push(mediaWatcher);
    }

    ngOnDestroy(): void {
        this.watchers
            .forEach(watcher => watcher.unsubscribe());
    }

    private initializeColsCount(): void {
        const matchingAliases = Object.keys(this.responsiveGridTile)
            // sort by number of columns desc
            .sort((a, b) => this.responsiveGridTile[b] - this.responsiveGridTile[a])
            // doublecheck
            .filter(alias => this.mediaObserver.isActive(alias));

        if (matchingAliases.length > 0) {
            const firstMatchingAlias = matchingAliases[0];
            this.tile.colspan = this.responsiveGridTile[firstMatchingAlias];
        } else {
            this.tile.colspan = this.responsiveGridTile.xs;
        }
    }

    private mapAlias(mqAlias: string): string {
        if (!mqAlias.includes('-')) {
            return mqAlias;
        }

        const parts = mqAlias.split('-');
        const ltOrGt = parts[0];
        const alias = parts[1];

        const keys = Object.keys(this.responsiveGridTile);
        const index = keys.indexOf(alias);

        return ltOrGt === 'lt'
            ? keys[index - 1]
            : keys[index + 1];
    }
}