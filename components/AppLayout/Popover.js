import React from 'react';
import Link from 'next/link';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from '@material-tailwind/react';

export function PopoverBox() {
    return (
      <Popover>
        <PopoverHandler>
          <Button>Show Popover</Button>
        </PopoverHandler>
        <PopoverContent>
          This is a very beautiful popover, show some love.
        </PopoverContent>
      </Popover>
    );
  }
