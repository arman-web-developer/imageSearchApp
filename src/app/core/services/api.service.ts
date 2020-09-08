import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IFavorite } from '../../core/models/favorite.type';
import { map } from 'rxjs/operators';
import { IUnsplashData } from '../../core/models/unsplash.type';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    private apiClientId: string = "Q6zWVosbv0x6l9MdqGc9e6GlfmL3J48yAWi9evSBLw4";
    private page = 1;
    private per_page = 40;

    public getImagesBySearch = (keyword: string): Observable<IUnsplashData[]> => {
        return this.http.get(`${environment.endpointFromUnspalsh}/search?page=${this.page}&per_page=${this.per_page}&client_id=${this.apiClientId}&query=${keyword}`).pipe(map((response: IUnsplashData[]) => {
            return response;
        }));
    }

    public getAllFavorites = (): Observable<IFavorite[]> => {
        return this.http.get(`${environment.favoritesAPI}`).pipe(map((response: IFavorite[]) => {
            return response;
        }));
    }

    public createFavoriteList = (favorite: IFavorite): Observable<IFavorite> => {
        return this.http.post(`${environment.favoritesAPI}`, favorite).pipe(map((response: IFavorite) => {
            return response;
        }));
    }

    public updateFavoriteListById = (favorite: IFavorite): Observable<IFavorite> => {
        return this.http.put(`${environment.favoritesAPI}/${favorite.id}`, favorite).pipe(map((response: IFavorite) => {
            return response;
        }));
    }

    public deleteFavoriteListById = (id: string): Observable<IFavorite> => {
        return this.http.delete(`${environment.favoritesAPI}/${id}`).pipe(map((response: IFavorite) => {
            return response;
        }));
    }

    public addImageInFavoriteListById = (id: string, request: any) => {
        return this.http.post(`${environment.favoritesAPI}/fav/${id}`, request).pipe(map((response) => {
            return response;
        }));
    }

    public deleteImageById = (id: string) => {
        return this.http.delete(`${environment.favoritesAPI}/fav/${id}`).pipe(map((response) => {
            return response;
        }));
    }

    public downloadImage = (img: HTMLImageElement): void => {
        const imgUrl = img.src;
        const imgName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1);
        this.http.get(imgUrl, { responseType: 'blob' as 'json' })
            .subscribe((res: any) => {
                const file = new Blob([res], { type: res.type });

                // IE
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(file);
                    return;
                }

                const blob = window.URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = blob;
                link.download = imgName;

                // Version link.click() to work at firefox
                link.dispatchEvent(new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                }));

                setTimeout(() => { // firefox
                    window.URL.revokeObjectURL(blob);
                    link.remove();
                }, 100);
            });
    }

}
