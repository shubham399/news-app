export async function GET() {
    const URL = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${process.env.API_KEY}&pageSize=100`;
    const response = await fetch(URL, { next: { revalidate: 3600 } });
    const data = await response.json()
    let resp = data.articles.filter((a: any) => a.urlToImage != null)
    return Response.json(resp)
}