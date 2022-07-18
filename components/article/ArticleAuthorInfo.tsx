import { format } from 'date-fns';
import React from 'react';
import { ArticleViewFragment } from '../../generated/graphql';
import CustomImage from '../common/CustomImage';
import CustomLink from '../common/CustomLink';

export default function ArticleAuthorInfo({
  article: {
    author: { username, image },
    createdAt,
  },
}: {
  article: ArticleViewFragment;
}) {
  return (
    <React.Fragment>
      <CustomLink href={{ pathname: '/profile/[username]', query: { username } }}>
        <CustomImage src={image} alt={username} className='author-image' />
      </CustomLink>
      <div className='info'>
        <CustomLink href={{ pathname: '/profile/[username]', query: { username } }} className='author'>
          {username}
        </CustomLink>
        <span className='date'>{format(new Date(createdAt), 'PP')}</span>
      </div>
    </React.Fragment>
  );
}
