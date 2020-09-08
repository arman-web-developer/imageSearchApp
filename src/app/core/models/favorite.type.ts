export interface IFavorite {
    id?: string,
    images?: IImage[],
    title?: string,
    description?: string,
}

export interface IImage {
    id: number;
    imgPath: string;
}
