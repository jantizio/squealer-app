import { ReactComponent as SquealerLogo } from '@/assets/vulture.svg';

const HeaderLogo = () => {
  return (
    <div className="flex items-center">
      <SquealerLogo width={50} height={50} />
      <p className="m-2 hidden sm:block">Squealer</p>
    </div>
  );
};

export default HeaderLogo;
