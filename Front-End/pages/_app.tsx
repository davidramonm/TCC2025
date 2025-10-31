import { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 15000); // refresh every 15 seconds
    return () => clearInterval(interval);
  }, []);

  return <Component {...pageProps} />;
}