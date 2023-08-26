import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './logo';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PencilSquareIcon,
  CircleStackIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  FolderIcon,
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
} from '@material-tailwind/react';

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
  const [open, setOpen] = React.useState(0);
  

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="flex flex-col-[minmax(16px,300px)_1fr] h-screen max-h-screen transition-all duration-500 ease-in-out">
      <div
        className={`bg-slate-500 text-zinc-50 fixed md:static z-20 h-full transition-width duration-500 ease-in-out ${
          collapsed ? 'w-16' : 'w-[300px]'
        } ${shown ? 'translate-x-0' : '-translate-x-full'}`}
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
              <Icon className="w-5 h-5 mx-auto" />
            </button>
          </div>
          <nav className="flex-grow">
            <ul
              className={classNames({
                'my-2 flex flex-col gap-2 items-stretch': true,
              })}
            >
              <Button
                color="green"
                className={`${
                  collapsed ? 'mx-auto ' : 'mx-8'
                } px-3 py-3 my-1 mt-5 text-sm`}
              >
                <Link href="/post/new">
                  {collapsed ? (
                    <PencilSquareIcon className="w-5 h-5" />
                  ) : (
                    'New Post'
                  )}
                </Link>
              </Button>
              <Button
                color="blue"
                className={`${
                  collapsed ? 'mx-auto' : 'mx-8'
                } px-3 py-3 my-1 text-sm`}
              >
                <Link href="/token-topup">
                  {collapsed ? (
                    <CircleStackIcon className="w-5 h-5" />
                  ) : (
                    <>
                      <span className="pl-1">{availableTokens} Tokens </span>
                      Available
                    </>
                  )}
                </Link>
              </Button>

              {collapsed ? (
                <Button
                  className="mx-auto px-3 py-3 my-1 text-sm bg-gray-300 text-gray-900"
                  onClick={() => handleOpen(3)}
                >
                  <FolderIcon className="w-5 h-5" />
                </Button>
              ) : (
                <Card className="w-full shadow-xl mx-8 w-300 bg-gray-300 my-1">
                  <Accordion
                    className="w-full "
                    open={open === 3}
                    icon={
                      <ChevronUpIcon
                        strokeWidth={2.5}
                        className={` mx-8 h-4 w-4 ${
                          open === 3 ? 'rotate-180' : ''
                        }`}
                      />
                    }
                  >
                    <ListItem className="p-0 " selected={open === 3}>
                      <AccordionHeader
                        onClick={() => handleOpen(3)}
                        className="border-b-0 "
                      >
                        <Typography className="mr-auto font-bold text-slate-950 text-sm uppercase mx-8">
                          History
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody>
                      <List className="p-0 ">
                        {posts.map((post) => (
                          <ListItem key={post._id}>
                            <Link
                              href={`/post/${post._id}`}
                              className={`py-1 text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 ${
                                postId === post._id
                                  ? 'bg-white/20 border-white'
                                  : ''
                              }`}
                            >
                              {post.topic}
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionBody>
                  </Accordion>
                </Card>
              )}
            </ul>
          </nav>
          <div className="`5 flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
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

      <div className="flex-1 overflow-y-auto">
        <div>{children}</div>
      </div>
    </div>
  );
};
