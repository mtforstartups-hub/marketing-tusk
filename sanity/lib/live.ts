import { client } from './client'
import { draftMode } from 'next/headers'

export async function sanityFetch({ query, params = {} }: { query: string, params?: any }) {
  let isDraftMode = false;
  try {
    isDraftMode = (await draftMode()).isEnabled;
  } catch (error) {
    // Ignore error: draftMode() is not available at build time (generateStaticParams)
  }

  // Disable CDN in development so we always get fresh, uncached data.
  // In production the CDN is re-enabled for performance.
  const isDev = process.env.NODE_ENV === 'development';

  const data = await client.fetch(query, params, {
    token: isDraftMode ? process.env.SANITY_API_READ_TOKEN : undefined,
    perspective: isDraftMode ? 'previewDrafts' : 'published',
    useCdn: isDev ? false : !isDraftMode,
    stega: isDraftMode,
  })
  
  return { data }
}

export const SanityLive = () => null 
