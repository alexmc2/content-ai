// import React from 'react';

// import {
//   Popover,
//   PopoverHandler,
//   PopoverContent,
//   Button,
// } from '@material-tailwind/react';
// import Image from 'next/image';

// export function UserPopover({ user }) {
//   const [collapsed, setCollapsed] = React.useState(false);

//   return (
    
//     <Popover placement="right">
//       <PopoverHandler>
//         <Button
//           className={`${
//             collapsed ? 'mx-auto  ' : 'mx-4'
//           } px-3 mt-1 text-md  hover:bg-gray-200  focus:bg-slate-100 text-slate-950 font-bold shadow-none hover:shadow-sm`}
//         >
//           <Image
//             src={user.picture}
//             alt={user.name}
//             height={50}
//             width={50}
//             className="rounded-full"
//           />
//           {user.name}
//         </Button>
//       </PopoverHandler>
//       <PopoverContent>
//         <span>This is a very beautiful popover, show some love.</span>
//       </PopoverContent>
//     </Popover>
//   );
// }
