import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    // {
    //   label: 'Previous',
    // },
    // {
    //   label: 'Next',
    // },
    {
      label: 'View Profile ->',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/SC.png`,
    aspectRatio: '1.91:1',
  },
  // input: {
  //   text: 'Tell me a boat story',
  // },
  postUrl: `${NEXT_PUBLIC_URL}api/frame`,
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>zizzamia.xyz</h1>
    </>
  );
}
