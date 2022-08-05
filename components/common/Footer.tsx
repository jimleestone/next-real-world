import CustomLink from './CustomLink';

export default function Footer() {
  return (
    <footer className='bg-gray-50 mt-3 py-4 shrink-0'>
      <div className='container flex flex-col items-center mx-auto md:flex-row'>
        <CustomLink href='/' className='font-titillium' mode='primary' underlined>
          conduit
        </CustomLink>
        <span className='mt-2 font-light text-sm text-gray-400 md:ml-2.5 md:mt-0 text-center'>
          An interactive learning project from <CustomLink href='https://thinkster.io'>Thinkster</CustomLink>. Code
          &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  );
}
