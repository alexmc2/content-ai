import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../context/postsContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import dayjs from 'dayjs';
import { Paginate } from '../components/Paginate';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import { useRouter } from 'next/router';
import clientPromise from '../lib/mongodb';
import { getAppProps } from '../utils/getAppProps';
import DeleteDialog from '../components/DeleteDialog';

import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon, TrashIcon } from '@heroicons/react/24/solid';
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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

export const History = ({ posts: postsFromSSR, totalCount }) => {
  const { user } = useUser();

  const { setPostsFromSSR, posts, getPosts } = useContext(PostsContext);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { deletePost } = useContext(PostsContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [sortColumn, setSortColumn] = useState(null); // 'title' or 'created'
  const [isDialogOpen, setDialogOpen] = useState(false); // State to manage the dialog's open/close status

  const postsPerPage = 10;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalCount / postsPerPage)
  );

  const TABLE_HEAD = ['Title', 'Topic', 'Keywords', 'Created', ''];
  useEffect(() => {
    setPostsFromSSR(postsFromSSR);
  }, [postsFromSSR, setPostsFromSSR]);

  const fetchPosts = async (page) => {
    const skip = (page - 1) * 10; // Calculate the number of posts to skip
    const result = await fetch('/api/getPosts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ skip }), // Pass the skip value in the request body
    });

    const data = await result.json();
    if (data.posts) {
      // Update your posts state with the new posts
      setPostsFromSSR(data.posts);
      // Update the current page
      setCurrentPage(page);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log('Deleting post with ID:', selectedPostId);
      const response = await fetch(`/api/deletePost`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ postId: selectedPostId }),
      });
      const json = await response.json();
      if (json.success) {
        deletePost(selectedPostId);
        handleCloseDialog(); // Close the dialog after deleting
      }
    } catch (e) {
      console.log('ERROR TRYING TO DELETE A POST: ', e);
      setError('Failed to delete the post. Please try again.');
    }
  };

  const handleOpenDialog = (postId) => {
    setSelectedPostId(postId);
    setDialogOpen(true);
  };
  const handleClose = () => {
    setSelectedPostId(null);
    setOpen(false);
  };
  const handleCloseDialog = () => {
    setSelectedPostId(null);
    setDialogOpen(false);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortColumn === 'title') {
      return sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortColumn === 'created') {
      return sortDirection === 'asc'
        ? new Date(a.created) - new Date(b.created)
        : new Date(b.created) - new Date(a.created);
    }
    return 0;
  });

  return (
    <div className="overflow-auto h-full my-9 m-4 ">
      <div className="max-w-screen-2xl mx-auto py-8">
        <Card className="h-full w-full flex  p-6">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Posts History
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row items-center ">
                <Link href="/post/new" legacyBehavior>
                  <Button className="bg-blue-900">New Post</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="w-full md:w-72 ">
                <Input
                  style={{ font: '2px' }}
                  label="Search function coming soon"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-none px-4 py-4 overflow-auto">
            <table className="mt-4 w-full table-auto text-left ">
              <thead className="w-full">
                <tr className="">
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className={`cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 py-4 transition-colors hover:bg-blue-gray-50 ${
                        head === 'Topic' || head === 'Keywords'
                          ? 'hide-on-mobile'
                          : ''
                      }`}
                      onClick={() => {
                        if (head === 'Title') handleSort('title');
                        if (head === 'Created') handleSort('created');
                      }}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-3 leading-none opacity-70 px-4"
                      >
                        {head}
                        {index !== TABLE_HEAD.length - 1 &&
                          head !== 'Topic' &&
                          head !== 'Keywords' && (
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

              <tbody className="gap-3">
                {sortedPosts.map((post) => (
                  <tr key={post._id}>
                    <td className="">
                      <Link href={`/post/${post._id}`} legacyBehavior>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-md cursor-pointer px-4"
                        >
                          {post.title}
                        </Typography>
                      </Link>
                    </td>
                    <td className="hide-on-mobile">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-md"
                      >
                        {post.topic}
                      </Typography>
                    </td>
                    <td className="hide-on-mobile">
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
                        {dayjs(post.created).format('MMMM D, YYYY h:mm A')}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Tooltip content="Delete Post">
                        <IconButton
                          onClick={() => handleOpenDialog(post._id)}
                          variant="gradient"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <DeleteDialog
              open={isDialogOpen}
              handleClose={handleCloseDialog}
              handleDeleteConfirm={handleDeleteConfirm}
            />
          </CardBody>

          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 px-3">
            <Typography
              variant="small"
              color="blue-gray"
              className="text-md px-1"
            >
              {totalPages > 0
                ? `Page ${currentPage} of ${totalPages}`
                : 'Page 1 of 1'}
            </Typography>

            <div className="flex gap-2 py-2">
              <Button
                variant="outlined"
                size="sm"
                disabled={currentPage === 1 || totalPages === 0}
                onClick={() => {
                  setCurrentPage((prev) => {
                    const newPage = Math.max(1, prev - 1);
                    fetchPosts(newPage);
                    return newPage;
                  });
                }}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => {
                  setCurrentPage((prev) => {
                    const newPage = Math.min(totalPages, prev + 1);
                    fetchPosts(newPage);
                    return newPage;
                  });
                }}
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

    const userSession = await getSession(ctx.req, ctx.res); // Get the user's session
    if (!userSession || !userSession.user) {
      return {
        notFound: true,
      };
    }
    const auth0Id = userSession.user.sub; // Get the user's unique ID from the session

    // Fetch the user from the users collection using the auth0Id
    const user = await db.collection('users').findOne({
      auth0Id: auth0Id,
    });

    if (!user) {
      return {
        notFound: true,
      };
    }

    // Fetch posts for the current user using the user's _id
    const posts = await db
      .collection('posts')
      .find({ userId: user._id })
      .toArray();

    // Count posts for the current user using the user's _id
    const totalCount = await db
      .collection('posts')
      .countDocuments({ userId: user._id });

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        totalCount, // Pass total count to the component
        ...props,
      },
    };
  },
});

export default History;
