import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ALL_TOOLS, getToolBySlug } from '@/lib/tools-data';
import ToolLayout from '@/components/ToolLayout';
import ToolDispatcher from '@/components/tools/ToolDispatcher';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found - IDX.ZONE',
      description: 'The requested online tool was not found.',
    };
  }

  // Create a unique, descriptive title for every tool
  let titleSuffix = 'Free Online Tool';
  if (tool.tagline) {
    // Extract first clause of tagline or clean summary
    const cleanTagline = tool.tagline.replace(/\.$/, '').split('.')[0];
    if (cleanTagline.length > 10 && cleanTagline.length < 50) {
      titleSuffix = cleanTagline;
    }
  }

  const title = `${tool.name} - ${titleSuffix} | IDX.ZONE`;
  const description = tool.tagline || tool.description;
  const canonical = `https://idx.zone/tools/${tool.slug}`;

  return {
    title,
    description,
    keywords: [tool.name, tool.category, ...(tool.keywords || []), 'free online tool', 'browser utility', 'IDX.ZONE'],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'IDX.ZONE',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `https://idx.zone/tools/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool}>
        <ToolDispatcher slug={tool.slug} />
      </ToolLayout>
    </>
  );
}
