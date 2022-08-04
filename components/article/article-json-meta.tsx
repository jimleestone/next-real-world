import { ArticleJsonLd } from 'next-seo';
import { ArticleViewFragment } from '../../generated/graphql';
import { BASE_URL } from '../../lib/constants';

export default function ArticleJsonMeta({ article }: { article: ArticleViewFragment }) {
  const { slug, title, description, createdAt, updatedAt, author } = article;
  const { username } = author;
  return (
    <ArticleJsonLd
      {...{ title, description }}
      url={`${BASE_URL}/article/${slug}`}
      images={[]}
      datePublished={createdAt}
      dateModified={updatedAt}
      authorName={username}
    />
  );
}
