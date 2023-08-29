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
      className=" h-9 w-9  text-white focus:bg-transparent active:bg-transparent  "
      ripple={true}
      onClick={props.onMenuButtonClick}
    >
      <Bars3Icon className="h-8 w-8 bg-blue-900 rounded-lg p-1 " />
    </IconButton>
  );
};
