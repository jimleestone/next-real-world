import { useRouter } from 'next/router';
import * as R from 'ramda';
import {
  ArticleInput,
  ArticlesDocument,
  EditArticleViewFragment,
  TagsDocument,
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from '../../generated/graphql';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
import { articleInputSchema } from '../../lib/validation/schema';
import Form from '../forms/form';
import FormTextarea from '../forms/form-teextarea';
import FormInput from '../forms/FormInput';
import Submit from '../forms/submit';
import TagInput from '../forms/tag-input';

export default function ArticleEditor({ article }: { article?: EditArticleViewFragment }) {
  const router = useRouter();
  const { errors, handleErrors } = useErrorsHandler();

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

  async function onSubmit(input: ArticleInput) {
    article
      ? await updateArticle({ variables: { slug: article.slug, input } })
      : await createArticle({ variables: { input } });
  }

  const init = article
    ? R.pickAll<EditArticleViewFragment, ArticleInput>(['body', 'description', 'title', 'tagList'], article)
    : { body: '', description: '', title: '', tagList: [] };

  return (
    <div className='mb-auto'>
      <div className='container flex flex-wrap flex-col items-center mx-auto mt-12'>
        <div className='w-9/12'>
          <Form<ArticleInput> onSubmit={onSubmit} schema={articleInputSchema} mode='onChange' defaultValues={init}>
            <fieldset className='flex flex-col justify-center mx-auto space-y-6' aria-live='polite'>
              <FormInput<ArticleInput> name='title' placeholder='Article title' />
              <FormInput<ArticleInput> name='description' placeholder="What's this article about?" />
              <FormTextarea<ArticleInput> name='body' placeholder='Write your article (in markdown)' rows={8} />
              <TagInput<ArticleInput> name='tagList' placeholder='Enter tags' />

              <Submit size='l' className='self-end' strict>
                Publish Article
              </Submit>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}
