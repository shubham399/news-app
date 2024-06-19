const NEWS_TYPE = [
    "crypto"
    , "economy"
    , "et_markets"
    , "ga_dimension"
    , "india"
    , "mediawire"
    , "mediawire_widget"
    , "mf"
    , "newsletter"
    , "nri"
    , "politics"
    , "rise"
    , "tech"
    , "top_news"
    , "videoshow"
    , "webstories"
]

const DATA_TYPES = [
    "articleshow",
    "videoshow",
    "premium",
    "podcast",
    "webstory"
]

export async function GET() {
    const URL = "https://etpwaapi.economictimes.com/request?type=home1";
    const response = await fetch(URL, { next: { revalidate: 20 } });
    const data: NewsAPI = await response.json()
    const news: NewsProp[] = data.searchResult.filter(item => NEWS_TYPE.includes(item.name)).map((item) => {
        return Array.isArray(item.data) ? item.data.filter(item => DATA_TYPES.includes(item.type)).reduce((acc, cur: Daum) => {
            const date = new Date();
            date.setDate(date.getDate() - 1);
            const data: NewsProp = {
                title: cur.title,
                description: cur?.synopsis,
                url: cur.url,
                publishedAt: cur.date.length > 0 ? new Date(cur.date) : date,
                "urlToImage": cur.img,
                author: cur.authors?.length ? cur.authors[0].title : undefined,
            }
            return [...acc, data]
        }, [] as NewsProp[]) : []
    }).flat().filter(item => item.url && item.title && item.urlToImage)
    return Response.json(news)
}



type NewsProp = {
    title?: string,
    url?: string,
    description?: string,
    urlToImage?: string,
    author?: string,
    publishedAt?: Date,
}


export interface NewsAPI {
    searchResult: SearchResult[]
}

export interface SearchResult {
    name: string
    data: Daum[]
    type?: string
    gridType?: string
    modified?: string
    trending?: Trending
    title?: string
    url?: string
    thumb?: string
}



export interface Trending {
    title?: string
    data: Daum[]
}

export interface Daum {
    urlToImage?: string
    title?: string
    url?: string
    img?: string
    date: string
    type: string
    authors?: Author[]
    layoutType?: string
    id?: string
    readtime?: number
    parentInfo?: ParentInfo
    ctn_url?: string
    name?: string
    layout?: string
    position?: string
    synopsis?: string
}

export interface Author {
    title: string
    url: string
    img: string
}

export interface ParentInfo {
    title: string
    msid: number
    url: string
}