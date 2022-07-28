import * as R from 'ramda';
import {
  ArticleViewFragment,
  AuthUser,
  CommentInput,
  CommentViewFragmentDoc,
  useCreateCommentMutation,
} from '../../generated/graphql';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
import { commentInputSchema } from '../../lib/validation/schema';
import CustomImage from '../common/CustomImage';
import Form from '../forms/form';
import FormTextarea from '../forms/form-teextarea';
import Submit from '../forms/submit';

export default function CommentForm({
  user: { image, username },
  article,
}: {
  user: AuthUser;
  article: ArticleViewFragment;
}) {
  const { handleErrors } = useErrorsHandler();

  const [createComment, { loading }] = useCreateCommentMutation({
    update(cache, { data }) {
      if (data) {
        const newComment = data.createComment;
        cache.modify({
          id: cache.identify(article),
          fields: {
            comments(existingCommentRefs = [], { readField }) {
              const newCommentRef = cache.writeFragment({
                data: newComment,
                fragment: CommentViewFragmentDoc,
              });
              if (existingCommentRefs.some((ref: any) => readField('id', ref) === newComment.id)) {
                return existingCommentRefs;
              }
              // prepend new comment to the top
              return R.prepend(newCommentRef, existingCommentRefs);
            },
          },
        });
      }
    },
    onError: (err) => handleErrors(err, true),
  });

  async function onPostComment(input: CommentInput) {
    await createComment({ variables: { slug: article.slug, input } });
  }
  const init: CommentInput = { body: '' };
  return (
    <Form<CommentInput> onSubmit={onPostComment} mode='onChange' schema={commentInputSchema} defaultValues={init}>
      <div className='bg-gray-100 border rounded-t-md shadow-sm'>
        <fieldset className='flex flex-col justify-center mx-auto' aria-live='polite'>
          <FormTextarea<CommentInput> name='body' placeholder='Write a comment...' rows={3} clear />

          <div className='py-2 px-4 '>
            <div className='flex flex-wrap items-center justify-between mx-auto'>
              <CustomImage src={image} alt={username} />
              <Submit className='self-end' strict>
                Post Comment
              </Submit>
            </div>
          </div>
        </fieldset>
      </div>
    </Form>
  );
}
