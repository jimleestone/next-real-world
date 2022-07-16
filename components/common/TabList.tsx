import { UrlObject } from 'url';
import Tab from './Tab';

export default function TabList({
  tabs,
  toggleClassName,
}: {
  tabs: { name: string; href: string | UrlObject; as?: string | UrlObject }[];
  toggleClassName: string;
}) {
  return (
    <div className={toggleClassName}>
      <ul className='nav nav-pills outline-active'>
        {tabs.map(({ name, href, as }) => (
          <Tab key={name} name={name} href={href} as={as} />
        ))}
      </ul>
    </div>
  );
}
