import React from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';
import Image from "next/legacy/image";
import { Logo } from '../logo';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  CircleStackIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FolderIcon,
  DocumentPlusIcon,
  PowerIcon,
  PhotoIcon,
  HomeIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Button,
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Popover,
  PopoverHandler,
  PopoverContent,
  CardBody,
  CardFooter,
} from '@material-tailwind/react';

export const Sidebar = ({
  children,
  availableTokens,
  shown,
  posts,
  postId,
}) => {
  const { user } = useUser();

  const [collapsed, setCollapsed] = React.useState(false);
  const Icon = collapsed ? ChevronRightIcon : ChevronLeftIcon;

  const [open, setOpen] = React.useState(0);

  const router = useRouter();
  const isOnNewPostPage = router.asPath === '/post/new';
  const isOnTokensPage = router.asPath === '/token-topup';
  const isOnHistoryPage = router.asPath === '/history';
  const isOnImagePage = router.asPath === '/image';
  const isOnHomePage = router.asPath === '/profile';

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = () => {
    // Redirect to the index page upon logging out
    window.location.href = '/api/auth/logout';
  };

  return (
    <div className="flex flex-col-[minmax(16px,280px)_1fr] h-screen max-h-screen transition-all duration-500 ease-in-out">
      <Card
        className={` fixed md:static z-20 h-full transition-width duration-500 ease-in-out rounded-none ${
          collapsed ? 'w-16' : 'w-[280px]'
        } ${shown ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div
          className={classNames({
            'flex flex-col justify-between h-screen sticky inset-0 w-full': true,
          })}
        >
          <div
            className={classNames({
              'flex items-center border-b border-b-slate-600  transition-none': true,
              'p-4  justify-between': !collapsed,
              'py-4 justify-center': collapsed,
            })}
          >
            {!collapsed && <Logo />}
            <button
              className=" hover:bg-slate-200 w-10 h-10 rounded-full opacity-0 md:opacity-100"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Icon className="w-6 -h-6 mx-auto" />
            </button>
          </div>
          <nav className="flex-grow ">
            <div
              className={classNames({
                'my-2 flex flex-col gap-2 items-stretch px-0 ': true,
              })}
            >
              <Button
                className={`${
                  collapsed ? 'mx-auto  ' : 'mx-4'
                } px-2 mt-5 text-md ${
                  isOnHomePage ? 'bg-gray-100' : 'bg-transparent'
                } hover:bg-gray-200  focus:bg-slate-100 text-slate-950 font-bold shadow-none hover:shadow-sm`}
              >
                <Link href="/home">
                  {collapsed ? (
                    <HomeIcon className="w-6 -h-6  " />
                  ) : (
                    <div className="flex items-center gap-3 ">
                      <HomeIcon className="w-6 -h-6" />
                      Home
                    </div>
                  )}
                </Link>
              </Button>
              <Button
                className={`${
                  collapsed ? 'mx-auto  ' : 'mx-4'
                } px-2 mt-1 text-md ${
                  isOnNewPostPage ? 'bg-gray-100' : 'bg-transparent'
                } hover:bg-gray-200  focus:bg-slate-100 text-slate-950 font-bold shadow-none hover:shadow-sm`}
              >
                <Link href="/post/new">
                  {collapsed ? (
                    <PencilSquareIcon className="w-6 -h-6" />
                  ) : (
                    <div className="flex items-center gap-3 ">
                      <PencilSquareIcon className="w-6 -h-6" />
                      New Post
                    </div>
                  )}
                </Link>
              </Button>
              <Button
                className={`${
                  collapsed ? 'mx-auto  ' : 'mx-4'
                } px-2 mt-1 text-md ${
                  isOnImagePage ? 'bg-gray-100' : 'bg-transparent'
                } hover:bg-gray-200  focus:bg-slate-100 text-slate-950 font-bold shadow-none hover:shadow-sm`}
              >
                <Link href="/post/image">
                  {collapsed ? (
                    <PhotoIcon className="w-6 -h-6 " />
                  ) : (
                    <div className="flex items-center gap-3 ">
                      <PhotoIcon className="w-6 -h-6" />
                      New Image
                    </div>
                  )}
                </Link>
              </Button>
              <Button
                className={`${
                  collapsed ? 'mx-auto  ' : 'mx-4'
                } px-2 mt-1 text-md ${
                  isOnTokensPage ? 'bg-gray-100' : 'bg-transparent'
                } hover:bg-gray-200  focus:bg-slate-100 text-slate-950 font-bold shadow-none hover:shadow-sm`}
              >
                <Link href="/token-topup">
                  {collapsed ? (
                    <CircleStackIcon className="w-6 -h-6" />
                  ) : (
                    <div className="flex items-center gap-3 ">
                      <CircleStackIcon className="w-6 -h-6" />
                      <span className="">Tokens ({availableTokens}) </span>
                    </div>
                  )}
                </Link>
              </Button>
              <Button
                className={`${
                  collapsed ? 'mx-auto  ' : 'mx-4'
                } px-2 mt-1 text-md ${
                  isOnHistoryPage ? 'bg-gray-100' : 'bg-transparent'
                } hover:bg-gray-200  focus:bg-slate-100 text-slate-950 font-bold shadow-none hover:shadow-sm`}
              >
                <Link href="/history">
                  {collapsed ? (
                    <FolderIcon className="w-6 -h-6" />
                  ) : (
                    <div className="flex items-center gap-3 ">
                      <FolderIcon className="w-6 -h-6" />
                      History
                    </div>
                  )}
                </Link>
              </Button>
              <Button 
                className={`${
                  collapsed ? 'mx-auto  ' : 'mx-4'
                } px-2 mt-1 text-md bg-transparent hover:bg-red-400 text-slate-950 font-bold shadow-none hover:shadow-sm`}
              >
                <Link href="/api/auth/logout">
                  {collapsed ? (
                    <PowerIcon className="w-6 -h-6" />
                  ) : (
                    <div className="flex items-center gap-3 ">
                      <PowerIcon className="w-6 -h-6" />
                      Logout
                    </div>
                  )}
                </Link>
              </Button>
            </div>
          </nav>
          <div className=" flex items-center gap-2 py-0 border-t border-t-black/50 h-15 px-0">
            {!!user ? (
              <>
                <Popover placement="top-start">
                  <PopoverHandler>
                    <Button
                      className={`${
                        collapsed ? 'mx-auto  ' : 'mx-3 w-full'
                      } text-slate-800 px-2 mt-1 text-md bg-transparent hover:bg-gray-200 shadow-none `}
                    >
                      <div className="flex items-center gap-3 ">
                        <Image
                          src={user.picture}
                          alt={user.name}
                          height={40}
                          width={40}
                          className="rounded-full p-0"
                        />
                        {!collapsed && (
                          <div className=" text-slate-800">{user.name}</div>
                        )}
                      </div>

                      <div className="mr-6 ">
                        <div className="flex items-center gap-3 text-lg "></div>
                      </div>
                    </Button>
                  </PopoverHandler>
                  <PopoverContent className="z-30">
                    <div className="mr-6 ">
                      <div className="flex items-center gap-3 text-lg ">
                        <FlagIcon className="w-6 -h-6" />
                        <Link href="/profile">Profile</Link>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {/* <UserPopover user={user} /> */}
              </>
            ) : (
              <Link href="/api/auth/login">Login</Link>
            )}
          </div>
        </div>
      </Card>

      <div className="flex-1 overflow-y-auto">
        <div>{children}</div>
      </div>
    </div>
  );
};
