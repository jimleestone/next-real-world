import { useTools } from '../../lib/hooks/use-tools';
import { joinStyles, joinStylesFromArray } from '../../lib/utils/styles-builder';

interface MarkedProps {
  content: string;
  className?: string;
}

const basicStyle = 'w-11/12 prose prose-stone md:prose-lg lg:prose-xl'; // dark:prose-invert
const typoStyles = {
  a: 'prose-a:no-underline prose-a:text-blue-600 hover:prose-a:text-blue-700 hover:prose-a:underline hover:prose-a:underline-offset-auto',
  headings: 'prose-headings:font-mplus',
};
const joinMarkedStyles = (className?: string) => joinStylesFromArray(basicStyle, joinStyles(typoStyles), className);

export default function Marked({ content, className }: MarkedProps) {
  const { markdown } = useTools();
  const markedContent = {
    __html: markdown.parse(content),
  };
  return <div dangerouslySetInnerHTML={markedContent} className={joinMarkedStyles(className)} />;
}
