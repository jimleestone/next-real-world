import { marked } from 'marked';
import { joinStylesFromArray } from '../../lib/utils/styles-builder';

interface MarkedProps {
  content: string;
  className?: string;
}

const basicStyle = 'prose prose-slate md:prose-lg lg:prose-xl'; // dark:prose-invert

const joinMarkedStyles = (className?: string) => joinStylesFromArray(basicStyle, className);

export default function Marked({ content, className }: MarkedProps) {
  const markup = {
    __html: marked.parse(content),
  };
  return <div dangerouslySetInnerHTML={markup} className={joinMarkedStyles(className)} />;
}
