import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const ButtonLine = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'relative w-2 translate-x-1/2 cursor-pointer border-none bg-none p-0 outline-none  before:absolute before:bottom-0 before:left-1/2 before:top-0 before:w-[2px] before:bg-secondary before:transition-colors before:ease-in-out before:content-[""] before:hover:bg-primary before:focus-visible:bg-primary',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
ButtonLine.displayName = 'ButtonLine';

export { ButtonLine };
