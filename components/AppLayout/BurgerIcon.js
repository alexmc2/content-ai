import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { IconButton } from '@material-tailwind/react';

export const BurgerIcon = (props) => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <IconButton
      variant="text"
      className=" h-8 w-8 mr-5 mt-5  text-grey-200 hover:bg-transparent focus:bg-transparent active:bg-transparent  text-white"
      ripple={true}
      onClick={props.onMenuButtonClick}
    >
      <Bars3Icon className="h-6 w-6" />
    </IconButton>
  );
};
