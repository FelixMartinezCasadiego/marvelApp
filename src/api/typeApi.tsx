export interface Response {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: Data;
}

export interface Data {
    offset:  number;
    limit:   number;
    total:   number;
    count:   number;
    results: Result[];
}

export interface Result {
    id:          number;
    name:        string;
    description: string;
    modified:    string;
    thumbnail:   Thumbnail;
    resourceURI: string;
    comics:      Comics;
    series:      Comics;
    stories:     Stories;
    events:      Comics;
    urls:        URL[];
    params?:     any;
}

export interface Comics {
    available:     number;
    collectionURI: string;
    items:         ComicsItem[];
    returned:      number;
}

export interface ComicsItem {
    resourceURI: string;
    name:        string;
    id?:         number;
}

export interface Stories {
    available:     number;
    collectionURI: string;
    items:         StoriesItem[];
    returned:      number;
}

export interface StoriesItem {
    resourceURI: string;
    name:        string;
    type:        Type;
}

export enum Type {
    Cover = "cover",
    InteriorStory = "interiorStory",
}

export interface Thumbnail {
    path:      string;
    extension: string;
}

export interface URL {
    type: string;
    url:  string;
}

export interface ResponseComics {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: DataComics;
}

export interface DataComics {
    offset:  number;
    limit:   number;
    total:   number;
    count:   number;
    results: ComicsByCharacter[];
}

export interface ComicsByCharacter {
    id:                 number;
    digitalId:          number;
    title:              string;
    issueNumber:        number;
    variantDescription: string;
    description:        string;
    modified:           string;
    isbn:               string;
    upc:                string;
    diamondCode:        string;
    ean:                string;
    issn:               string;
    format:             string;
    pageCount:          number;
    textObjects:        TextObject[];
    prices:             Prices[];
    thumbnail:          Thumbnail;
    creators:           Creators;
}

export interface TextObject {
    type:     string;
    language: string;
    text:     string;
}

export interface Prices {
    type: string;
    price: number;
}

export interface Creators {
    available:  number,
    collectionURI: string;
    items: ItemsCreators[];
    returned: number;
}

export interface ItemsCreators {
    resourceURI: string;
    name: string;
    role: string;
}