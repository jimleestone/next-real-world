import dateFormat from '../../lib/utils/date-format';
import CustomImage from '../common/CustomImage';
import CustomLink from '../common/CustomLink';

export interface AuthorInfo {
  createdAt: any;
  username: string;
  image?: string | null;
}
interface ArticleAuthorInfoProps {
  inlined?: boolean; // layout property
  dark?: boolean; // background
  authorInfo: AuthorInfo;
}

export default function ArticleAuthorInfo({ inlined = false, dark = false, authorInfo }: ArticleAuthorInfoProps) {
  const { username, image, createdAt } = authorInfo;
  return (
    <div className={`flex flex-wrap ${inlined ? 'items-center' : 'items-end'}`}>
      <CustomLink href={`/profile/${username}`}>
        <CustomImage src={image} alt={username} />
      </CustomLink>
      <div className={`flex ml-2 ${inlined ? 'flex-wrap items-center' : 'flex-col items-start'}`}>
        <CustomLink href={`/profile/${username}`} underlined mode={`${dark ? 'reverse' : 'secondary'}`}>
          {username}
        </CustomLink>
        <span className={`text-xs text-gray-400 ${inlined && 'ml-2'}`}>{dateFormat(new Date(createdAt))}</span>
      </div>
    </div>
  );
}
