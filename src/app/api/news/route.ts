export async function GET() {
    const URL = "https://etpwaapi.economictimes.com/request?type=home1";
    const response = await fetch(URL, { next: { revalidate: 20 } });
    const data: NewsAPI = await response.json()
    const news = data.searchResult[0].data.map((item) => {
        return {
            title: item.title,
            description: item.synopsis,
            url: item.url,
            publishedAt: new Date(item.date),
            "urlToImage": item.img,
            content: item.synopsis,
            author: item.authors?.length && item.authors[0].title,
        }
    }).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    console.debug("🚀  file: route.ts:19  GET  news:", news.length);
    return Response.json(news)
}

export interface NewsAPI {
    searchResult: SearchResult[]
    parameters: Parameters
}

export interface SearchResult {
    title: string
    name: string
    data: Daum[]
}

export interface Daum {
    title: string
    img: string
    synopsis: string
    url: string
    msid: number
    date: string
    type: string
    summary: string
    RealEstateLocality: string
    RealEstateAddress: string
    authors?: Author[]
    readtime?: number
}

export interface Author {
    title: string
    url: string
    img: string
}

export interface Parameters {
    type: string
    msid: string
    top: string
}
