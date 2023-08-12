import { ReactComponent as SquealerLogo } from '@/assets/vulture.svg';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-center">
        <SquealerLogo width={50} height={50} />
        <p className="m-2 hidden sm:block">Squealer</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
