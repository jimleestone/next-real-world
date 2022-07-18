import Head from 'next/head';

export default function Title({ title }: { title: string }) {
  return (
    <div>
      <Head>
        <title>{title} | Conduit</title>
      </Head>
    </div>
  );
}
