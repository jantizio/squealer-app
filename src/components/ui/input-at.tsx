import { Input } from '@/components/ui/input';
import React from 'react';

export interface InputAtProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputAt = React.forwardRef<HTMLInputElement, InputAtProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative before:pointer-events-none before:absolute before:left-3 before:top-[20%] before:text-muted-foreground before:content-['@'] [&>input]:pl-7">
        <Input className={className} type={type} ref={ref} {...props} />
      </div>
    );
  },
);

InputAt.displayName = 'InputAt';

export { InputAt };
