// src/lib/sanity-queries.ts
// GROQ queries for Sanity CMS. These map 1:1 to our mock data structure.
// When you connect Sanity, you will use these queries with the sanityPublic client.

export const EVENTS_QUERY = `*[_type == "event" && date >= now()] | order(date asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  date,
  "location": {
    "city": location.city,
    "name": location.name,
    "address": location.address
  },
  "speaker": {
    "name": speaker.name,
    "role": speaker.role
  },
  status,
  spotsLeft,
  description,
  "image": image.asset->url
}`;

export const PAST_EVENTS_QUERY = `*[_type == "event" && date < now()] | order(date desc) [0...6] {
  _id,
  title,
  date,
  "city": location.city,
  "attendees": stats.attendees,
  status
}`;

export const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  subtitle,
  "slug": slug.current,
  category,
  "author": author->name,
  readTime,
  isFeatured,
  "cover": cover.asset->url
}`;

export const SINGLE_EVENT_QUERY = `*[_type == "event" && slug.current == $slug][0] {
  ...,
  "speaker": {
    "name": speaker.name,
    "role": speaker.role,
    "bio": speaker.bio
  }
}`;

export const SINGLE_ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  ...,
  "author": author->{name, "slug": slug.current},
  "cover": cover{..., "url": asset->url}
}`;