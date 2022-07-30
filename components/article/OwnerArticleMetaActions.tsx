import { useRouter } from 'next/router';
import React from 'react';
import { ArticlesDocument, ArticleViewFragment, TagsDocument, useDeleteArticleMutation } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import { useMessageHandler } from '../../lib/hooks/use-message';
import CustomButton from '../common/CustomButton';

export default function OwnerArticleMetaActions({ article }: { article: ArticleViewFragment }) {
  const router = useRouter();
  const { handleErrors } = useMessageHandler();
  const { slug } = article;
  const { user } = useCurrentUser();

  const [deleteArticle, { loading }] = useDeleteArticleMutation({
    refetchQueries: [
      { query: TagsDocument },
      { query: ArticlesDocument, variables: { offset: 0 } },
      { query: ArticlesDocument, variables: { author: user?.username, offset: 0 } },
    ],
    onCompleted: () => router.replace('/'),
    onError: (err) => handleErrors({ err, mode: 'toast' }),
  });

  async function onDeleteArticle() {
    await deleteArticle({ variables: { slug } });
  }

  return (
    <React.Fragment>
      <CustomButton size='s' color='secondary' outlined onClick={() => router.push(`/editor/${slug}`)}>
        <i className='ion-edit'></i>
        &nbsp; Edit Article
      </CustomButton>
      &nbsp;
      <CustomButton size='s' color='danger' outlined disabled={loading} onClick={() => onDeleteArticle()}>
        <i className='ion-trash-a'></i>
        &nbsp; Delete Article
      </CustomButton>
    </React.Fragment>
  );
}
