export async function GET() {
    const URL = `https://m.inshorts.com/api/undefined/en/news?category=top_stories&max_limit=100&include_card_data=true`;
    const response = await fetch(URL, { next: { revalidate: 3600 } });
    const data: NewsAPI = await response.json()
    const news = data.data.news_list.filter(item => !item.news_obj.sponsored_by).map((item) => {
        return {
            title: item.news_obj.title,
            description: item.news_obj.content,
            url: item.news_obj.source_url,
            publishedAt: item.news_obj.created_at,
            "urlToImage": item.news_obj.image_url,
            content: item.news_obj.content,
            author: item.news_obj.author_name,
        }
    })
    return Response.json(news)
}


export interface NewsAPI {
    data: Data
    error: boolean
}

export interface Data {
    min_news_id: string
    news_list: NewsList[]
    reload_required: any
    feed_type: string
}

export interface NewsList {
    hash_id: string
    news_type: string
    rank: number
    version: number
    type: string
    read_override: boolean
    fixed_rank: boolean
    publisher_interaction_meta: PublisherInteractionMeta
    news_obj: NewsObj
    no_index?: boolean
    show_capsule_image?: boolean
}

export interface PublisherInteractionMeta {
    user_id: string
    is_publisher_followed: boolean
    show_follow_button: boolean
}

export interface NewsObj {
    old_hash_id: string
    hash_id: string
    author_name: string
    content: string
    source_url: string
    source_name: string
    title: string
    important: boolean
    image_url: string
    shortened_url: string
    created_at: number
    score: number
    category_names: string[]
    relevancy_tags: string[]
    hash_tags?: string[]
    tenant: string
    fb_object_id: string
    fb_like_count: number
    country_code: string
    impressive_score: number
    targeted_city: any[]
    gallery_image_urls: any[]
    full_gallery_urls: any[]
    bottom_headline: string
    bottom_text: string
    darker_fonts: boolean
    bottom_panel_link: string
    bottom_type: string
    footer_deck_id?: string
    footer_deck_tag_label?: string
    byline_1: Byline1[]
    byline_2: Byline2[]
    version: number
    position_start_time: string
    position_expire_time: string
    trackers: any[]
    dfp_tags: string
    dont_show_ad: boolean
    poll_tenant: string
    language: string
    show_inshorts_brand_name?: boolean
    crypto_coin_preference: any
    is_overlay_supported: boolean
    news_type: string
    is_muted: boolean
    video_audio_type: string
    auto_play_type: string
    show_in_video_feed_only: boolean
    similar_threshold: number
    is_similar_feed_available: boolean
    publisher_info: PublisherInfo
    show_publisher_info: boolean
    is_profile_clickable: boolean
    publisher_interaction_meta: PublisherInteractionMeta2
    show_capsule_image: boolean
    capsule_image_url: string
    capsule_custom_card_id: string
    capsule_custom_card_url: string
    capsule_campaign: string
    no_index?: boolean
    sponsored_by?: string
    dont_show_time?: boolean
    image_for_representation?: boolean
}

export interface Byline1 {
    type: string
    text?: string
    bold?: boolean
}

export interface Byline2 {
    type: string
    text: string
    bold?: boolean
}

export interface PublisherInfo {
    name: string
    user_id: string
    user_type: string
    profile_image_url: string
    thumbnail_image_url: string
    sponsored_text: string
}

export interface PublisherInteractionMeta2 {
    user_id: string
    is_publisher_followed: boolean
    show_follow_button: boolean
}



// {
//     -"source": {
//     "id": "google-news",
//     "name": "Google News"
//     },
//     "author": "The New York Times",
//     "title": "Celtics capture 18th NBA championship with Game 5 win over Mavericks - The Athletic - The New York Times",
//     "description": null,
//     "url": "https://news.google.com/rss/articles/CBMiZWh0dHBzOi8vd3d3Lm55dGltZXMuY29tL2F0aGxldGljLzU1NzE0NzUvMjAyNC8wNi8xNy9jZWx0aWNzLW1hdmVyaWNrcy1uYmEtZmluYWxzLWdhbWUtNS1zY29yZS1yZXN1bHQv0gEA?oc=5",
//     "urlToImage": null,
//     "publishedAt": "2024-06-18T06:11:15Z",
//     "content": null
//     }