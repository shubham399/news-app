// pages/api/e

import { NextResponse } from "next/server";

// export default async function GET() {
//     try {
//         // Make a GET request to an external API
//         const URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a59c78340205456d96b0ee30b42229a0`;
//         const response = await fetch(URL);

//         // Check if the request was successful (status code 200)
//         if (!response.ok) {
//             throw new Error('External API request failed');
//         }

//         const data = await response.json();

//         // Set Cache-Control header to cache the response for 1 hour
//         // res.setHeader('Cache-Control', 'public, max-age=3600');

//         // Return the data to the client
//         return new NextResponse(JSON.stringify())
//     } catch (error) {
//         console.error('Error fetching data from external API:', error);
//         // Return a 500 status code to the client
//         return new NextResponse(JSON.stringify({ "error": 'Internal server error' }), 500);
//         // res.status(500).json();
//     }
// }


export async function GET() {
    const URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}`;;
    const response = await fetch(URL);
    const data = await response.json()
    let resp = data.articles.filter((a) => a.urlToImage != null)
    return Response.json(resp)
}