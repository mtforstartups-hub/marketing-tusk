import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl: '/studio', // Or: 'https://my-cool-project.sanity.studio'
    enabled: true, // Optional. Default to: process.env.VERCEL_ENV === 'preview', 
  }
})
