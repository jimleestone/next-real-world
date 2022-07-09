import { format } from 'date-fns';
import Image from 'next/image';
import { CommentViewFragment } from '../../generated/graphql';
import CustomLink from '../common/CustomLink';

export default function ArticleComment({
  comment: {
    id,
    body,
    createdAt,
    author: { username, image },
  },
  slug,
  index,
}: {
  comment: CommentViewFragment;
  slug: string;
  index: number;
}) {
  return (
    <div className='card'>
      <div className='card-block'>
        <p className='card-text'>{body}</p>
      </div>
      <div className='card-footer'>
        <CustomLink className='comment-author' href={{ pathname: '/profile/[username]', query: { username } }}>
          <Image src={image || ' '} alt={username} className='comment-author-img' height={30} width={30} />
        </CustomLink>
        &nbsp;
        <CustomLink className='comment-author' href={{ pathname: '/profile/[username]', query: { username } }}>
          {username}
        </CustomLink>
        <span className='date-posted'>{format(new Date(createdAt), 'PP')}</span>
        {/* {user.isSome() && user.unwrap().username === username && (
          <span className='mod-options'>
            <i
              className='ion-trash-a'
              aria-label={`Delete comment ${index + 1}`}
              onClick={() => onDeleteComment(slug, id)}
            ></i>
          </span>
        )} */}
      </div>
    </div>
  );
}
