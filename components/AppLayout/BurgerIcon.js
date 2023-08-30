import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { IconButton, Button} from '@material-tailwind/react';

export const BurgerIcon = (props) => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
<Button
      className="h-9 w-9 text-white bg-blue-900 rounded-md p-1"
      onClick={props.onMenuButtonClick}
    >
      <Bars3Icon  />
    </Button>
  );
};
