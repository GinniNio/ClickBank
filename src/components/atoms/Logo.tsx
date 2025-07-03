import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Image
        src="/images/logo.png"
        alt="ClickBank Marketing Secrets"
        width={40}
        height={40}
        className="mr-2"
      />
      <span className="text-xl font-bold text-slate-900 dark:text-white">
        ClickBank Secrets
      </span>
    </div>
  );
};

export default Logo; 