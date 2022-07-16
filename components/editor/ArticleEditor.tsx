import { useRouter } from 'next/router';
import * as R from 'ramda';
import { FormEvent, useEffect, useState } from 'react';
import {
  ArticleInput,
  ArticlesDocument,
  EditArticleViewFragment,
  TagsDocument,
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from '../../generated/graphql';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
import { buildGenericFormField } from '../../lib/utils/genericFormField';
import { ContainerPage } from '../common/ContainerPage';
import { GenericForm } from '../common/GenericForm';

export default function ArticleEditor({ article }: { article?: EditArticleViewFragment }) {
  const router = useRouter();
  const [input, setInput] = useState<ArticleInput>({ body: '', description: '', title: '', tagList: [] });
  const [tag, setTag] = useState<string>('');
  const { errors, handleErrors } = useErrorsHandler();

  useEffect(() => {
    if (article) {
      const { title, body, description, tagList } = article;
      setInput({ title, body, description, tagList });
    }
  }, [article]);

  const [createArticle, { loading: createSubmitting }] = useCreateArticleMutation({
    refetchQueries: [
      { query: TagsDocument },
      { query: ArticlesDocument, variables: { offset: 0 } },
      { query: ArticlesDocument, variables: { author: article?.author.username, offset: 0 } },
    ],
    onCompleted: (data) => {
      if (data) router.replace(`/article/${data.createArticle.slug}`);
    },
    onError: (err) => handleErrors(err),
  });
  const [updateArticle, { loading: updateSubmitting }] = useUpdateArticleMutation({
    refetchQueries: [{ query: TagsDocument }],
    onCompleted: (data) => {
      if (data) router.replace(`/article/${data.updateArticle.slug}`);
    },
    onError: (err) => handleErrors(err),
  });

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    article
      ? await updateArticle({ variables: { slug: article.slug, input } })
      : await createArticle({ variables: { input } });
  }

  function onUpdateField(name: string, value: string) {
    if (name === 'tag') {
      setTag(value);
      return;
    }
    if (name !== 'tagList') setInput({ ...input, [name as keyof ArticleInput]: value });
  }
  function onAddTag() {
    if (tag.length > 0) {
      setInput({ ...input, tagList: R.append(tag, input.tagList) });
      setTag('');
    }
  }
  function onRemoveTag(_: string, index: number) {
    setInput({ ...input, tagList: R.remove(index, 1, input.tagList) });
  }

  return (
    <div className='editor-page'>
      <ContainerPage>
        <div className='col-md-10 offset-md-1 col-xs-12'>
          <GenericForm
            formObject={{ ...input, tag } as unknown as Record<string, string | null>}
            errors={errors}
            disabled={createSubmitting || updateSubmitting}
            onChange={onUpdateField}
            onSubmit={onSubmit}
            submitButtonText='Publish Article'
            onAddItemToList={onAddTag}
            onRemoveListItem={onRemoveTag}
            fields={[
              buildGenericFormField({ name: 'title', placeholder: 'Article Title' }),
              buildGenericFormField({ name: 'description', placeholder: "What's this article about?", lg: false }),
              buildGenericFormField({
                name: 'body',
                placeholder: 'Write your article (in markdown)',
                fieldType: 'textarea',
                rows: 8,
                lg: false,
              }),
              buildGenericFormField({
                name: 'tag',
                placeholder: 'Enter Tags',
                listName: 'tagList',
                fieldType: 'list',
                lg: false,
              }),
            ]}
          />
        </div>
      </ContainerPage>
    </div>
  );
}
