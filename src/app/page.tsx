'use client';
import xml2js from 'xml2js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';




export default function Home() {
  const [news, setNews] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/news').then((response) => response.json());
      console.log(result)
      setNews(result);
    };

    fetchData();
  }, []);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="mt-10 max-w-auto lg:h-[300px]  flex min-h-screen flex-col items-center justify-between sm:py-10 sm:p-2 md:p-24 "
    >
      {news.length > 0 ?
        (<CarouselContent className="p-auto m-auto  h-dvh">
          {Array.from({ length: news.length }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 pb-2" >
              <a href={news[index].url}>
                <NewsCard title={news[index].title} description={news[index].description} image_url={news[index].urlToImage} url={news[index].url} author={news[index].author} />
              </a>
            </CarouselItem>
          ))}
          <CarouselItem key={news.length} className="pt-1 pb-2" >
            <Card className="cursor-pointer h-full lg:h-[300px]">
              <CardContent>
                <CardTitle>No More content</CardTitle>
                <CardDescription>Please try after sometime...</CardDescription>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>)
        :
        (
          <p>Content Loading....</p>
        )}
    </Carousel>
  )
}




function NewsCard({ title, description, image_url, url, author }: { title: string, description: string, image_url: string, url: string, author?: string }) {
  return (
    <Card className="cursor-pointer h-full lg:h-[300px]">
      <CardHeader className='flex justify-between items-center'>
        <img loading="lazy" alt={title} src={image_url} className=' lazy-load h-full lg:h-[200px] w-full lg:w-[200px] object-cover' />
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link className="text-sm" href={url}>Read More</Link>
        {author && `By ${author}`}
      </CardFooter>
    </Card>);
}