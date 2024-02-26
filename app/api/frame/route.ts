import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

import { getDownloadURL, ref } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'bounties-test-48451.firebaseapp.com',
  projectId: 'bounties-test-48451',
  storageBucket: 'bounties-test-48451.appspot.com',
  messagingSenderId: '436840297771',
  appId: '1:436840297771:web:02e479f0d12b64feb7416e',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function getImageURL(address: string) {
  const imageURL = await getDownloadURL(ref(storage, `profilePictures/${address}`));
  return imageURL;
}

async function fetchUsers() {
  try {
    const response = await fetch('https://collab.song.camp/api/getAllUsers');
    const data = await response.json();
    console.log('External API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from external API:', error);
  }
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';
  // let userObjectArray: Array<object> = []

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
    allowFramegear: true,
  });
  console.log('message:', message);
  console.log('body:', body);

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.button === 1) {
    const data = await fetchUsers();
    text = `🌟${data[3].data.username}🌟`;
    const profilePic = await getImageURL(data[3].data.walletAddress);
    console.log(text);
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Previous',
          },
          {
            label: 'Next',
          },
          {
            label: `View ${text}'s Profile`,
            action: 'post_redirect'
          },
        ],
        image: {
          src: profilePic,
          aspectRatio: '1:1',
        },
        postUrl: `http://localhost:3000/api/frame`,
      }),
    );
  }

  if (message?.button === 2) {
    text = 'you clicked the second button';
    console.log(text);
  }

  if (message?.button === 3) {
    const data = await fetchUsers();
    console.log(text);
    return NextResponse.redirect(
      `https://collab.song.camp/profileview/${data[3].data.walletAddress}`,
      { status: 302 },
    );
  }

  if (message?.button === 3) {
    return NextResponse.redirect(
      'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
      { status: 302 },
    );
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `${text} 🌲🌲`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/park-1.png`,
      },
      postUrl: `http://localhost:3000/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
