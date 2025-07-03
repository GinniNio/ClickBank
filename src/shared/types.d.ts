import { ReactNode } from 'react';

export interface CallToActionType {
  text: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  targetBlank?: boolean;
}

export interface HeroProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  tagline?: string;
  callToAction?: CallToActionType;
  callToAction2?: CallToActionType;
  image?: {
    src?: string;
    alt?: string;
  };
}

export interface ContentProps {
  id?: string;
  hasBackground?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    tagline?: string;
  };
  content?: string;
  items?: Array<{
    title?: string;
    description?: string;
  }>;
  image?: {
    src?: string;
    alt?: string;
  };
  isReversed?: boolean;
  isAfterContent?: boolean;
}

export interface FeaturesProps {
  id?: string;
  hasBackground?: boolean;
  columns?: number;
  header?: {
    title?: ReactNode;
    subtitle?: string;
    tagline?: string;
  };
  items?: Array<{
    title?: string;
    description?: string;
    icon?: React.ComponentType<{ className?: string }>;
    callToAction?: CallToActionType;
  }>;
}

export interface TestimonialsProps {
  id?: string;
  hasBackground?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    tagline?: string;
  };
  testimonials?: Array<{
    name?: string;
    job?: string;
    testimonial?: string;
    image?: {
      src?: string;
      alt?: string;
    };
    href?: string;
  }>;
}

export interface PricingProps {
  id?: string;
  hasBackground?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    tagline?: string;
  };
  prices?: Array<{
    title?: string;
    subtitle?: string;
    price?: string;
    period?: string;
    items?: Array<{
      title?: string;
      description?: string;
    }>;
    callToAction?: CallToActionType;
    hasRibbon?: boolean;
    ribbonTitle?: string;
  }>;
}

export interface FAQsProps {
  id?: string;
  hasBackground?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    tagline?: string;
  };
  items?: Array<{
    title?: string;
    description?: string;
  }>;
}

export interface CallToActionProps {
  id?: string;
  hasBackground?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
  };
  callToAction?: CallToActionType;
}

export interface HeaderProps {
  links?: Array<{
    label?: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
    links?: Array<{
      label?: string;
      href?: string;
    }>;
  }>;
  actions?: Array<CallToActionType>;
  isSticky?: boolean;
  showToggleTheme?: boolean;
  showRssFeed?: boolean;
  position?: 'right' | 'left' | 'center';
}

export interface FooterProps {
  title?: string;
  links?: Array<{
    label?: string;
    href?: string;
  }>;
  columns?: Array<{
    title?: string;
    links?: Array<{
      label?: string;
      href?: string;
    }>;
  }>;
  socials?: Array<{
    label?: string;
    icon?: React.ComponentType<{ className?: string }>;
    href?: string;
  }>;
  footNote?: string;
}

export interface AnnouncementProps {
  title?: string;
  callToAction?: CallToActionType;
  callToAction2?: CallToActionType;
}

export interface SocialProofProps {
  id?: string;
  hasBackground?: boolean;
  images?: Array<{
    link?: string;
    src?: string;
    alt?: string;
  }>;
}

export interface StepsProps {
  id?: string;
  hasBackground?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    tagline?: string;
  };
  items?: Array<{
    title?: string;
    description?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

export interface TeamProps {
  id?: string;
  hasBackground?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    tagline?: string;
  };
  team?: Array<{
    name?: string;
    job?: string;
    image?: {
      src?: string;
      alt?: string;
    };
    socials?: Array<{
      label?: string;
      icon?: React.ComponentType<{ className?: string }>;
      href?: string;
    }>;
  }>;
}

export interface ContactProps {
  id?: string;
  hasBackground?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    tagline?: string;
  };
  content?: string;
  items?: Array<{
    title?: string;
    description?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  form?: {
    inputs?: Array<{
      type?: string;
      name?: string;
      label?: string;
      autoComplete?: string;
      placeholder?: string;
    }>;
    textarea?: {
      name?: string;
      label?: string;
      placeholder?: string;
    };
    btn?: {
      title?: string;
      type?: 'submit' | 'reset' | 'button';
    };
  };
} 