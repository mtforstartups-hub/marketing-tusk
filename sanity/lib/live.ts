import { client } from './client'
import { draftMode } from 'next/headers'

export async function sanityFetch({ query, params = {} }: { query: string, params?: any }) {
  const isDraftMode = (await draftMode()).isEnabled

  const data = await client.fetch(query, params, {
    token: isDraftMode ? process.env.SANITY_API_READ_TOKEN : undefined,
    perspective: isDraftMode ? 'previewDrafts' : 'published',
    useCdn: !isDraftMode,
    stega: isDraftMode,
  })
  
  return { data }
}

export const SanityLive = () => null 
