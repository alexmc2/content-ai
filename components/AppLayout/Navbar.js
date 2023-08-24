// import React from 'react';
// import { Bars3Icon } from '@heroicons/react/24/outline';
// import {
//   Navbar,
//   MobileNav,
//   Typography,
//   Button,
//   IconButton,
//   Card,
// } from '@material-tailwind/react';

// export const StickyNavbar = (props) => {
//   const [openNav, setOpenNav] = React.useState(false);

//   React.useEffect(() => {
//     window.addEventListener(
//       'resize',
//       () => window.innerWidth >= 960 && setOpenNav(false)
//     );
//   }, []);

//   const navList = (
//     <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
//       {/* ... rest of your nav items */}
//     </ul>
//   );

//   return (
//     <Navbar className="sticky top-0 z-10 h-max max-w-full border-0 rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-gradient-to-b from-slate-900 to-slate-800 shadow-none ">
//       <div className="flex items-center justify-between text-transparent ">
//         <Typography
//           as="a"
//           href="#"
//           className="mr-4 cursor-pointer py-1.5 font-medium"
//         >
//           Admin Panel
//         </Typography>
//         <div className="flex items-center gap-4">
//           <div className="mr-4 hidden lg:block">{navList}</div>
//           <Button variant="gradient" size="sm" className="hidden"></Button>
//           <IconButton
//             variant="text"
//             className="ml-auto h-6 w-6 text-grey-200 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-white"
//             ripple={true}
//             onClick={props.onMenuButtonClick}
//           >
//             <Bars3Icon className="h-6 w-6" />
//           </IconButton>
//         </div>
//       </div>
//       <MobileNav open={openNav}>
//         {navList}
//         <Button
//           variant="gradient"
//           size="sm"
//           fullWidth
//           className="mb-2"
//         ></Button>
//       </MobileNav>
//     </Navbar>
//   );
// };

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
    <div className="flex flex-col-[minmax(0px,300px)_1fr] transition-all duration-500 ease-in-out">
      <IconButton
        variant="text"
        className="ml-auto h-8 w-8 mr-5 mt-5  text-grey-200 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-white"
        ripple={true}
        onClick={props.onMenuButtonClick}
      >
        <Bars3Icon className="h-6 w-6" />
      </IconButton>
    </div>
  );
};
