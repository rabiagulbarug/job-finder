import { NextRequest } from 'next/server';
// @ts-ignore
import Cookies from "js-cookie";

// Use this for client-side context
export const getClientSideToken = () => {
  if (typeof window === 'undefined') {
    return null; // Return null if it's server-side
  }
  return Cookies.get('accessToken'); // Client-side cookie access
};

// Use this for server-side context in Next.js middleware or getServerSideProps
export const getServerSideToken = (req: NextRequest | Request) => {
  // NextRequest for middleware, Request for getServerSideProps
  const cookies = req.headers.get('cookie');
  const cookie = cookies
      ?.split('; ')
      .find((c) => c.trim().startsWith('accessToken'));
  return cookie?.split('=')[1];
};

// If you need to use this in a mixed context, you could create a single function that handles both
export const getToken = (req?: NextRequest | Request) => {
  if (req) {
    // Server-side context
    return getServerSideToken(req);
  } else {
    // Client-side context
    return getClientSideToken();
  }
};
