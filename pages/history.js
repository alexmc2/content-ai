import { useContext, useEffect } from 'react';
import { PostsContext } from '../context/postsContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import moment from 'moment';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import clientPromise from '../lib/mongodb';
import { getAppProps } from '../utils/getAppProps';

import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';

export const History = ({ posts: postsFromSSR }) => {
  const { user } = useUser();

  const { setPostsFromSSR, posts, getPosts } = useContext(PostsContext);

  const TABLE_HEAD = ['Title', 'Topic', 'Keywords', 'Created', ''];
  useEffect(() => {
    setPostsFromSSR(postsFromSSR);
  }, [postsFromSSR, setPostsFromSSR]);

  return (
    <div className="overflow-auto h-full m-4">
      <div className="max-w-screen-xl mx-auto py-8">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Posts History
                </Typography>
                <Typography color="gray" className="mt-1">
                  See information about all posts
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  view all
                </Button>

                <Button className="flex items-center gap-3" size="sm">
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Post
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              {/* If you have categories or filters for posts, you can use the Tabs component here. 
         Otherwise, you can remove the Tabs and just keep the search input. */}
              <div className="w-full md:w-72">
                <Input
                  label="Search Posts"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-none px-0">
            <table className="mt-4 w-full  table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 leading-none opacity-70"
                      >
                        {head}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id}>
                    <Link href={`/post/${post._id}`}>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-md"
                        >
                          {post.title}
                        </Typography>
                      </td>
                    </Link>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-md"
                      >
                        {post.topic}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-md"
                      >
                        {post.keywords}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-md"
                      >
                        {moment(post.created).format('MMMM Do YYYY, h:mm a')}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Tooltip content="Edit Post">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="text-md">
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button
                onClick={() => {
                  getPosts({ lastPostDate: posts[posts.length - 1].created });
                }}
                variant="outlined"
                size="sm"
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

History.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);

    const client = await clientPromise;
    const db = client.db('Content-AI');

    const posts = await db.collection('posts').find().toArray();

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        ...props,
      },
    };
  },
});

export default History;
