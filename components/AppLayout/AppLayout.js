import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { Logo } from './logo';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@material-tailwind/react';

export const AppLayout = ({
  children,
  availableTokens,
  shown,
  posts,
  postId,
}) => {
  const { user } = useUser();
  const [collapsed, setCollapsed] = React.useState(false);
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;

  return (
    <div className="flex flex-col-[minmax(16px,300px)_1fr] h-screen max-h-screen transition-all duration-300 ease-in-out">
         {shown && (
      <div
        className={classNames({
          'bg-indigo-700 text-zinc-50 fixed md:static md:translate-x-0 z-20 h-full transition-all duration-300 ease-in-out': true,
          'w-[300px]': !collapsed,
          'w-16': collapsed,
          '-translate-x-full': !shown,
        })}
      >
        <div
          className={classNames({
            'flex flex-col justify-between h-screen sticky inset-0 w-full': true,
          })}
        >
          <div
            className={classNames({
              'flex items-center border-b border-b-indigo-800 transition-none': true,
              'p-4 justify-between': !collapsed,
              'py-4 justify-center': collapsed,
            })}
          >
            {!collapsed && <Logo />}
            <button
              className="grid place-content-center hover:bg-indigo-800 w-10 h-10 rounded-full opacity-0 md:opacity-100"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Icon className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-grow">
            <ul
              className={classNames({
                'my-2 flex flex-col gap-2 items-stretch': true,
              })}
            >
              <Button className="px-3 py-3 mx-8 text-sm">
                <Link href="/post/new">New Post</Link>
              </Button>
              <li>
                <Link
                  href="/token-topup"
                  className="block mt-2 text-center py-2"
                >
                  <span className="pl-1">{availableTokens} Tokens </span>
                  Available
                </Link>
              </li>
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/post/${post._id}`}
                  className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${
                    postId === post._id ? 'bg-white/20 border-white' : ''
                  }`}
                >
                  {post.topic}
                </Link>
              ))}
            </ul>
          </nav>
          <div className="bg-indigo-700 flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
            {!!user ? (
              <>
                <div className="min-w-[50px]">
                  <Image
                    src={user.picture}
                    alt={user.name}
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold">{user.email}</div>
                  <Link className="text-sm" href="/api/auth/logout">
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <Link href="/api/auth/login">Login</Link>
            )}
          </div>
        </div>
      </div>
         )}
      <div className="flex-1 overflow-y-auto">
        <div>{children}</div>
      </div>
    </div>
  );
};
