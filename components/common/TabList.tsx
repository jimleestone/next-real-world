import Tab, { TabProps } from './Tab';

export default function TabList({ tabs }: { tabs: TabProps[] }) {
  return (
    <div className='border-b border-gray-200 pb-4'>
      <ul className='flex flex-wrap -mb-px items-center text-base font-medium'>
        {tabs.map(({ name, href, as }) => (
          <Tab key={name} name={name} href={href} as={as} />
        ))}
      </ul>
    </div>
  );
}
