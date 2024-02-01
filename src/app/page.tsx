'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Link from 'next/link';
import { useEffect, useState } from "react";

type NewsProp = {
  title: string,
  url: string,
  description: string,
  urlToImage?: string,
  author?: string,
}



export default function Home() {
  const [news, setNews] = useState<NewsProp[]>([])

  useEffect(() => {
    fetch('/api/news', { next: { 'revalidate': 3600 } }).then(res => res.json()).then(setNews)
  }, [])

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="mt-10 max-w-auto  flex h-dvh flex-col items-center justify-between bg-gray-50"
    >
      <CarouselContent className="pt-10 p-auto m-auto h-svh w-svh">
        {Array.from({ length: news.length }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 pb-2" >
            <a href={news[index].url}>
              <NewsCard title={news[index].title} description={news[index].description} image_url={news[index].urlToImage} url={news[index].url} author={news[index].author} />
            </a>
          </CarouselItem>
        ))}
        <CarouselItem key={news.length} className="pt-1 pb-2" >
          <Card className="overflow-clip cursor-pointer m-auto  p-auto h-[80vh] w-[80vw] lg:h-[80vh] lg:w-[60vw] flex flex-col justify-between">
            <CardHeader className='flex justify-center items-center'>
              <CardTitle>No More Content</CardTitle>
              <CardDescription>Please Try Later</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}




function NewsCard({ title, description, image_url, url, author }: { title: string, description: string, image_url?: string, url: string, author?: string }) {
  return (
    <Card className="overflow-clip cursor-pointer m-auto  p-auto h-[80vh] w-[80vw] lg:h-[80vh] lg:w-[60vw] flex flex-col justify-between">
      <CardHeader className='flex justify-center items-center'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" alt={title} src={image_url} className='h-full w-full max-h-[600px] max-w-[600px] object-cover' />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Link className="text-sm" href={url}>Read More</Link>
        <p className='text-mute truncate'>{author && `By ${author}`}</p>
      </CardFooter>
    </Card>
  );
}