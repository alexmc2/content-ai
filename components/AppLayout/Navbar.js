import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from '@material-tailwind/react';

export const BurgerIcon = (props) => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <nav class="top-0 flex w-full flex-wrap items-center justify-between bg-transparent py-2 text-neutral-500  hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 ">
      <div class="flex w-full flex-wrap items-center justify-between px-3">
       
          <a class="text-xl text-neutral-800 dark:text-neutral-200" href="#">
            Fixed top
          </a>
          <IconButton
            variant="text"
            className=" h-8 w-8 mr-5 mt-5  text-grey-200 hover:bg-transparent focus:bg-transparent active:bg-transparent  text-white"
            ripple={true}
            onClick={props.onMenuButtonClick}
          >
            <Bars3Icon className="h-6 w-6" />
          </IconButton>
        </div>
      
    </nav>
  );
};
