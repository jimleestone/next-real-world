import React from 'react';
import { ArticleViewFragment } from '../../generated/graphql';
import FavoritesButton from '../common/FavoritesButton';
import FollowsButton from '../common/FollowsButton';

export default function NonOwnerArticleMetaActions({ article }: { article: ArticleViewFragment }) {
  const { favorited, author } = article;
  const { following } = author;
  return (
    <React.Fragment>
      <FollowsButton
        author={author}
        className={`btn btn-sm ${following ? 'btn-secondary' : 'btn-outline-secondary'}`}
      />
      &nbsp;
      <FavoritesButton
        article={article}
        className={`btn btn-sm ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
        text={(favorited ? 'Unfavorite ' : 'Favorite ') + 'Article'}
      />
    </React.Fragment>
  );
}
