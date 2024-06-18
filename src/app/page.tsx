'use client';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Link from 'next/link';
import { useEffect, useState } from "react";

type NewsProp = {
  title: string,
  url: string,
  description: string,
  urlToImage?: string,
  author?: string,
  publishedAt: number,
}



export default function Home() {
  const [news, setNews] = useState<NewsProp[]>([])

  useEffect(() => {
    fetch('/api/news').then(res => res.json()).then(setNews)
  }, [])



  return (
    <>
      {news.length > 0 ? (<Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="mt-10 max-w-auto  flex h-dvh flex-col items-center justify-between bg-gray-50">
        <CarouselContent className="pt-10 p-auto m-auto h-svh w-svh">
          {news.map((singleNews, index) => (
            <CarouselItem key={index} className="pt-1 pb-2" >
              <a href={singleNews.url}>
                <NewsCard title={singleNews.title} description={singleNews.description} image_url={singleNews.urlToImage} url={singleNews.url} author={singleNews.author} publishedAt={singleNews.publishedAt} />
              </a>
            </CarouselItem>
          ))}
          <CarouselItem key={news.length} className="pt-1 pb-2" >
            <Card className="overflow-clip cursor-pointer m-auto  p-auto h-[80vh] w-[80vw] lg:h-[80vh] lg:w-[60vw] flex flex-col justify-between">
              <CardHeader className='flex justify-center items-center'>
                <CardTitle>No More Content</CardTitle>
                <CardDescription>
                  Please Try Later
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
              </CardFooter>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>) : (
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </main>
      )
      }
    </>
  )
}




function NewsCard({ title, description, image_url, url, author, publishedAt }: { title: string, description: string, image_url?: string, url: string, author?: string, publishedAt: number }) {
  return (
    <Card className="overflow-clip cursor-pointer m-auto  p-auto h-[80vh] w-[80vw] lg:h-[80vh] lg:w-[60vw] flex flex-col justify-between">
      <CardHeader className='flex justify-center items-center'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" alt={title} src={image_url} className='h-full w-full max-h-[300px] max-w-[600px] object-cover' />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Link className="text-sm" href={url}>Read More</Link>
        <div className="flex flex-col">
          <p className='text-mute truncate'>{author && `By ${author}`}</p>
          <p className='text-mute truncate'>{publishedAt && `Published ${new Date(publishedAt).toLocaleString()}`}</p>
        </div>
      </CardFooter>
    </Card>
  );
}