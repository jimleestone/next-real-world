import { BASE_URL } from '../constants';

const defaultSeo = {
  defaultTitle: 'Conduit',
  titleTemplate: '%s | Conduit',
  description: 'A fullstack implementation of the RealWorld App using Next.js, Prisma ORM and Apollo GraphQL stack',
  openGraph: {
    type: 'website',
    title: 'Conduit',
    description: 'A fullstack implementation of the RealWorld App using Next.js, Prisma ORM and Apollo GraphQL stack',
    site_name: 'next-real-world',
    url: BASE_URL,
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default defaultSeo;
