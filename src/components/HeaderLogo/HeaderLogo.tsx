import { ReactComponent as SquealerLogo } from '@/assets/vulture.svg';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type HeaderLogoProps = {
  responsive?: boolean;
};

const HeaderLogo = ({ responsive }: HeaderLogoProps) => {
  const responsiveClass = responsive ? 'hidden sm:block' : '';

  return (
    <Link to="/">
      <div className="flex items-center">
        <SquealerLogo className="w-12 h-12" />
        <p className={cn('m-2', responsiveClass)}>Squealer</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
