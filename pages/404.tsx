import { NextPage } from 'next';
import CustomLink from '../components/common/CustomLink';

const Custom404: NextPage = () => {
  return (
    <div
      style={{
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>404</h1>
      <p style={{ display: 'inherit' }}>
        <CustomLink href='/'>Go To Home Page</CustomLink>
      </p>
      <p>Sorry, the content you are looking for could not be found.</p>
    </div>
  );
};

export default Custom404;
