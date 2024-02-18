'use client';

import Button from '@/components/base/button';
import cn from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type FC } from 'react';
import './navbar.scss';

const Navbar: FC = () => {
  const { data: session, status } = useSession();
  const [isHomepage, setIsHomepage] = useState<boolean>(true);
  const [authPage, setAuthPage] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pathname = usePathname();

  if (session && status) {
    console.log(session.user, status); // eslint-disable-line no-console
  }

  const handleSignOut = (): void => {
    void (async () => {
      try {
        await signOut({ callbackUrl: '/login' });
      } catch (error) {
        console.error(`Error signing out: ${error}`);
      }
    })();
  };

  // Refactor this because...well it's hideous
  const stateHandler = (page: string): void => {
    if (page === 'login') {
      setIsAuthenticated(false);
      setIsHomepage(false);
      setAuthPage('/login');
    } else if (page === 'sign up') {
      setIsAuthenticated(false);
      setIsHomepage(false);
      setAuthPage('/signup');
    } else if (page === 'dashboard') {
      setIsAuthenticated(true);
      setIsHomepage(false);
      setAuthPage('');
    } else {
      setIsAuthenticated(false);
      setIsHomepage(true);
    }
  };

  const urlHandler = (path: string): void => {
    if (path === '/') {
      stateHandler('home');
    } else if (path === '/login') {
      stateHandler('login');
    } else if (path === '/signup') {
      stateHandler('sign up');
    } else if (path === '/dashboard') {
      stateHandler('dashboard');
    }
  };

  useEffect((): void => {
    urlHandler(pathname);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">
          <Image src="/logos/logo.svg" width={100} height={85} alt="Notebook" />
        </Link>
      </div>
      {status === 'authenticated' ? (
        <ul className="nav_items">
          <li className="nav_item">
            <p className="nav_item username">{session?.user?.name}</p>
          </li>
          <li className="nav_item">
            <Button className="nav_button create" onClick={() => handleSignOut()}>
              Sign out
            </Button>
          </li>
        </ul>
      ) : (
        <ul
          className={cn('nav_items', {
            singleBtn: !isHomepage
          })}
        >
          <li className="nav_item">
            {authPage !== '/login' && !isAuthenticated && (
              <Button className="nav_button">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </li>
          <li className="nav_item">
            {authPage !== '/signup' && !isAuthenticated && (
              <Button className="nav_button create">
                <Link href="/signup">Sign up</Link>
              </Button>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
