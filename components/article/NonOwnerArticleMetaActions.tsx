import React from 'react';
import { ArticleViewFragment } from '../../generated/graphql';
import { classObjectToClassName } from '../../lib/utils/style';

export default function NonOwnerArticleMetaActions({
  article: {
    slug,
    favoritesCount,
    favorited,
    author: { username, image },
  },
}: {
  article: ArticleViewFragment;
}) {
  return (
    <React.Fragment>
      <button
        className={classObjectToClassName({
          btn: true,
          'btn-sm': true,
          'btn-outline-secondary': true,
          'btn-secondary': false,
        })}
        disabled={false}
      >
        <i className='ion-plus-round'></i>
        &nbsp; Following
      </button>
      &nbsp;
      <button
        className={classObjectToClassName({
          btn: true,
          'btn-sm': true,
          'btn-outline-primary': true,
          'btn-primary': false,
        })}
      >
        <i className='ion-heart'></i>
        &nbsp; {(favorited ? 'Unfavorite ' : 'Favorite ') + 'Article'}
        <span className='counter'>({favoritesCount})</span>
      </button>
    </React.Fragment>
  );
}
