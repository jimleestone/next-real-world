import CustomLink from './CustomLink';

export default function Footer() {
  return (
    <footer>
      <div className='container'>
        <CustomLink href='/' className='logo-font'>
          conduit
        </CustomLink>
        <span className='attribution'>
          An interactive learning project from <a href='https://thinkster.io'>Thinkster</a>. Code &amp; design licensed
          under MIT.
        </span>
      </div>
    </footer>
  );
}
