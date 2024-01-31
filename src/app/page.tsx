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
  return (<main className="flex min-h-screen flex-col items-center justify-between sm:py-10 sm:p-2 md:p-24 bg-gray-300">
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs py-10"
    >
      <CarouselContent className="p-auto m-auto md:w-[270px] h-[600px]">
        {Array.from({ length: news.length }).map((_, index) => (
          <CarouselItem key={index} className="pt-1" >
                  <a href={news[index].url}>
                  <NewsCard title={news[index].title} description={news[index].description} image_url={news[index].urlToImage} />
                  </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>

  </main>)
}




function NewsCard({ title, description, image_url }: { title: string, description: string, image_url: string }) {
  return (<Card className="cursor-pointer">
    <CardHeader className='flex justify-between items-center'>
      <img alt={title} src={image_url} width={"100%"} />
    </CardHeader>
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardContent>
    <CardFooter className="flex justify-between">
    </CardFooter>
  </Card>);
}