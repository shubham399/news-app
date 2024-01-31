export async function GET() {
    const URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}`;;
    const response = await fetch(URL,{ next: { revalidate: 3600 } });
    const data = await response.json()
    let resp = data.articles.filter((a:any) => a.urlToImage != null)
    return Response.json(resp)
}