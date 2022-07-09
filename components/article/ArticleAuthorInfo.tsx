import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import { ArticleViewFragment } from '../../generated/graphql';
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
        <Image src={image || ' '} alt={username} height={32} width={32} />
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
