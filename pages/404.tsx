import { NextPage } from 'next';
import Link from 'next/link';
import Title from '../components/common/Title';

const Custom404: NextPage = () => {
  return (
    <>
      <Title title='Not Found' />
      <div className='not-found'>
        <h1>404</h1>
        <p>
          <Link href='/' replace>
            Go To Home Page
          </Link>
        </p>
        <p>Sorry, the content you are looking for could not be found.</p>
      </div>
    </>
  );
};

export default Custom404;
