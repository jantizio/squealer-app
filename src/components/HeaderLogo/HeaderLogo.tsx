import { ReactComponent as SquealerLogo } from '@/assets/vulture.svg';
import { Large } from '@/components/ui/typography';
import { cn } from '@/utils';
import { Link } from 'react-router-dom';

type Props = Readonly<{
  responsive?: boolean;
}>;

export const HeaderLogo = ({ responsive }: Props) => {
  return (
    <Link to="/" aria-label="home">
      <div className="flex items-center">
        <SquealerLogo className="h-12 w-12" aria-label="squealer logo" />
        <Large className={cn('m-2', { 'hidden sm:block': responsive })}>
          Squealer
        </Large>
      </div>
    </Link>
  );
};
