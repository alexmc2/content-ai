// import React from 'react';
// import { Bars3Icon } from '@heroicons/react/24/outline';
// import {
//   MobileNav,
//   IconButton,
//   Button,
// } from '@material-tailwind/react';

// export const BurgerMenu = (props) => {
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
//     <>
//       <IconButton
//         variant="text"
//         className="ml-auto h-6 w-6 text-grey-200 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-white"
//         ripple={true}
//         onClick={() => setOpenNav(!openNav)}
//       >
//         <Bars3Icon className="h-6 w-6" />
//       </IconButton>
//       <MobileNav open={openNav}>
//         {navList}
//         <Button
//           variant="gradient"
//           size="sm"
//           fullWidth
//           className="mb-2"
//         ></Button>
//       </MobileNav>
//     </>
//   );
// };
