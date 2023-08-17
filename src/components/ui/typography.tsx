import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Props_t = {
  children: ReactNode;
  className?: string;
};

export function H1({ children, className }: Props_t) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: Props_t) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: Props_t) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }: Props_t) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h4>
  );
}

export function P({ children, className }: Props_t) {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  );
}

export function A({
  children,
  className,
  href,
  external,
}: Props_t & { href: string; external?: boolean }) {
  if (external)
    return (
      <a
        href={href}
        className={cn(
          'font-medium text-primary underline underline-offset-4',
          className
        )}
      >
        {children}
      </a>
    );
  return (
    <Link
      to={href}
      className={cn(
        'font-medium text-primary underline underline-offset-4',
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Blockquote({ children, className }: Props_t) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  );
}

export function List({ children, className }: Props_t) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>
      {children}
    </ul>
  );
}

export function InlineCode({ children, className }: Props_t) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
    >
      {children}
    </code>
  );
}

export function Lead({ children, className }: Props_t) {
  return (
    <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
  );
}

export function Large({ children, className }: Props_t) {
  return (
    <div className={cn('text-lg font-semibold', className)}>{children}</div>
  );
}

export function Small({ children, className }: Props_t) {
  return (
    <small className={cn('text-sm font-medium leading-none', className)}>
      {children}
    </small>
  );
}

export function Muted({ children, className }: Props_t) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
  );
}
