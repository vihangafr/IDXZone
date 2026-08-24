import { MetadataRoute } from 'next';
import { ALL_TOOLS, CATEGORIES } from '@/lib/tools-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://idx.zone';
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Category pages
  CATEGORIES.forEach((cat) => {
    routes.push({
      url: `${baseUrl}/categories/${cat.id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Individual tool pages
  ALL_TOOLS.forEach((tool) => {
    routes.push({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: tool.popular ? 0.9 : 0.8,
    });
  });

  return routes;
}
