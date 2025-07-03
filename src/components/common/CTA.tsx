import Link from 'next/link';
import { CallToActionType } from '~/shared/types';

interface CTAProps {
  callToAction: CallToActionType;
  linkClass?: string;
}

const CTA = ({ callToAction, linkClass }: CTAProps) => {
  const { text, href, icon: Icon, targetBlank } = callToAction;

  return (
    <Link
      className={linkClass}
      href={href}
      target={targetBlank ? '_blank' : undefined}
      rel={targetBlank ? 'noopener' : undefined}
    >
      {Icon && <Icon className="mr-1 -ml-1.5 h-5 w-5" />}
      {text}
    </Link>
  );
};

export default CTA; 