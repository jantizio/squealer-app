import { ReactComponent as SquealerLogo } from '@/assets/vulture.svg';
import { Large } from '@/components/ui/typography';
import { cn } from '@/utils';
import { Link } from 'react-router-dom';

type HeaderLogoProps = {
  responsive?: boolean;
};

const HeaderLogo = ({ responsive }: HeaderLogoProps) => {
  const responsiveClass = responsive ? 'hidden sm:block' : '';

  return (
    <Link to="/">
      <div className="flex items-center">
        <SquealerLogo className="h-12 w-12" />
        <Large className={cn('m-2', responsiveClass)}>Squealer</Large>
      </div>
    </Link>
  );
};

export default HeaderLogo;
