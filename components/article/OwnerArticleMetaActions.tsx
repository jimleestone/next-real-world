import { useRouter } from 'next/router';
import React from 'react';
import { ArticlesDocument, ArticleViewFragment, TagsDocument, useDeleteArticleMutation } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';

export default function OwnerArticleMetaActions({ article }: { article: ArticleViewFragment }) {
  const router = useRouter();
  const { handleErrors } = useErrorsHandler();
  const { slug } = article;
  const { user } = useCurrentUser();

  const [deleteArticle, { loading }] = useDeleteArticleMutation({
    refetchQueries: [
      { query: TagsDocument },
      { query: ArticlesDocument, variables: { offset: 0 } },
      { query: ArticlesDocument, variables: { author: user?.username, offset: 0 } },
    ],
    onCompleted: () => router.replace('/'),
    onError: (err) => handleErrors(err),
  });

  async function onDeleteArticle() {
    await deleteArticle({ variables: { slug } });
  }

  return (
    <React.Fragment>
      <button className='btn btn-outline-secondary btn-sm' onClick={() => router.push(`/editor/${slug}`)}>
        <i className='ion-edit'></i>
        &nbsp; Edit Article
      </button>
      &nbsp;
      <button className='btn btn-outline-danger btn-sm' disabled={loading} onClick={() => onDeleteArticle()}>
        <i className='ion-trash-a'></i>
        &nbsp; Delete Article
      </button>
    </React.Fragment>
  );
}
