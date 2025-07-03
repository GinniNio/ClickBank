import {
  IconArrowDown,
  IconArrowsRightLeft,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBulb,
  IconCheck,
  IconClock,
  IconComponents,
  IconDownload,
  IconListCheck,
  IconMail,
  IconMapPin,
  IconPhoneCall,
  IconRocket,
  IconTrendingUp,
  IconUsers,
  IconChartBar,
  IconTarget,
  IconShield,
} from '@tabler/icons-react';
import {
  CallToActionProps,
  ContactProps,
  ContentProps,
  FAQsProps,
  FeaturesProps,
  HeroProps,
  PricingProps,
  SocialProofProps,
  StepsProps,
  TeamProps,
  TestimonialsProps,
} from '../../types';

// Hero data on Home page *******************
export const heroHome: HeroProps = {
  title: (
    <>
      Unlock Your <span className="hidden md:inline">ClickBank</span> <span>Success</span> with{' '}
      <span className="sm:whitespace-nowrap">Proven Strategies</span>
    </>
  ),
  subtitle: (
    <>
      <span className="hidden md:inline">
        <span className="font-semibold underline decoration-primary-600 decoration-wavy decoration-1 underline-offset-2">
          ClickBank Marketing Secrets
        </span>{' '}
        reveals the exact strategies used by top earners to generate $10K+ monthly income from affiliate marketing.
      </span>{' '}
      Learn content marketing, viral marketing, and video marketing techniques that actually work.
    </>
  ),
  callToAction: {
    text: 'Get Started Now',
    href: '/checkout',
    icon: IconDownload,
    targetBlank: false,
  },
  callToAction2: {
    text: 'Learn More',
    href: '#features',
  },
  image: {
    src: '/images/product-cover.jpg',
    alt: 'ClickBank Marketing Secrets',
  },
};

// Features data on Home page *******************
export const featuresHome: FeaturesProps = {
  id: 'features',
  hasBackground: false,
  columns: 3,
  header: {
    title: (
      <>
        What You Get with <span className="whitespace-nowrap">ClickBank Secrets</span>
      </>
    ),
    subtitle:
      "Discover the proven strategies, tools, and techniques that top ClickBank earners use to generate consistent affiliate income.",
    tagline: 'Features',
  },
  items: [
    {
      title: 'Content Marketing Mastery',
      description:
        'Learn how to create viral content that drives massive traffic and converts visitors into buyers.',
      icon: IconComponents,
      callToAction: {
        text: 'Learn more',
        href: '#',
      },
    },
    {
      title: 'Viral Marketing Strategies',
      description:
        'Master the art of creating shareable content that spreads like wildfire across social media platforms.',
      icon: IconRocket,
      callToAction: {
        text: 'Learn more',
        href: '#',
      },
    },
    {
      title: 'Video Marketing Secrets',
      description:
        'Discover how to create compelling video content that engages audiences and drives conversions.',
      icon: IconTrendingUp,
      callToAction: {
        text: 'Learn more',
        href: '#',
      },
    },
    {
      title: 'Traffic Generation',
      description:
        'Learn proven methods to drive targeted traffic to your ClickBank offers and maximize conversions.',
      icon: IconTarget,
      callToAction: {
        text: 'Learn more',
        href: '#',
      },
    },
    {
      title: 'Conversion Optimization',
      description:
        'Master the psychology of persuasion and learn techniques to increase your conversion rates.',
      icon: IconChartBar,
      callToAction: {
        text: 'Learn more',
        href: '#',
      },
    },
    {
      title: 'Community & Support',
      description:
        'Join our exclusive community of successful marketers and get ongoing support and mentorship.',
      icon: IconUsers,
      callToAction: {
        text: 'Learn more',
        href: '#',
      },
    },
  ],
};

// Content data on Home page *******************
export const contentHomeOne: ContentProps = {
  id: 'contentOne-on-home-one',
  hasBackground: true,
  header: {
    title: 'Why ClickBank Marketing Secrets Works',
    subtitle: 'Proven strategies that have generated millions in affiliate income',
    tagline: 'Success Stories',
  },
  content:
    'Our comprehensive system combines the best practices from top ClickBank earners with modern digital marketing techniques to help you achieve consistent results.',
  items: [
    {
      title: 'Step-by-Step Blueprint',
      description:
        'Follow our proven 7-step system that takes you from beginner to ClickBank success, with detailed instructions and real examples.',
    },
    {
      title: 'Traffic Generation Methods',
      description:
        'Learn 15+ different traffic sources and how to leverage each one for maximum ClickBank affiliate income.',
    },
    {
      title: 'Conversion Optimization',
      description:
        'Master the psychology of persuasion and learn the exact techniques that increase conversion rates by 300% or more.',
    },
  ],
  image: {
    src: '/images/product-mockup.png',
    alt: 'ClickBank Marketing System',
  },
  isReversed: false,
  isAfterContent: false,
};

// Testimonials data on Home page *******************
export const testimonialsHome: TestimonialsProps = {
  id: 'testimonials-on-home',
  hasBackground: false,
  header: {
    title: 'What Our Members Say',
    subtitle: 'Real results from real people',
    tagline: 'Testimonials',
  },
  testimonials: [
    {
      name: 'Sarah Johnson',
      job: 'Former Teacher',
      testimonial: `I went from making $200/month to over $8,000/month in just 6 months using these ClickBank strategies. The step-by-step approach made all the difference.`,
      image: {
        src: '/images/testimonial-1.jpg',
        alt: 'Sarah Johnson',
      },
      href: '/testimonials',
    },
    {
      name: 'Mike Chen',
      job: 'Software Developer',
      testimonial: `The viral marketing techniques in this course are game-changing. I've been able to create content that spreads organically and drives consistent sales.`,
      image: {
        src: '/images/testimonial-2.jpg',
        alt: 'Mike Chen',
      },
      href: '/testimonials',
    },
    {
      name: 'Lisa Rodriguez',
      job: 'Stay-at-Home Mom',
      testimonial: `This system gave me the confidence and tools to build a successful online business. I'm now earning more than my husband's salary from ClickBank alone.`,
      image: {
        src: '/images/testimonial-3.jpg',
        alt: 'Lisa Rodriguez',
      },
      href: '/testimonials',
    },
  ],
};

// Pricing data on Home page *******************
export const pricingHome: PricingProps = {
  id: 'pricing-on-home',
  hasBackground: false,
  header: {
    title: 'Choose Your Success Path',
    subtitle: 'Select the plan that fits your goals and budget',
    tagline: 'Pricing',
  },
  prices: [
    {
      title: 'Starter',
      subtitle: 'Perfect for beginners',
      price: '97',
      period: 'one-time',
      items: [
        {
          title: 'Complete ClickBank Marketing Course',
          description: 'Access to all video lessons and training materials',
        },
        {
          title: 'Traffic Generation Guide',
          description: '15+ proven traffic sources explained',
        },
        {
          title: 'Email Support',
          description: 'Get help when you need it',
        },
        {
          title: '30-Day Money-Back Guarantee',
          description: 'Risk-free investment in your success',
        },
      ],
      callToAction: {
        text: 'Get Started',
        href: '/checkout',
        targetBlank: false,
      },
      hasRibbon: false,
    },
    {
      title: 'Professional',
      subtitle: 'Most Popular Choice',
      price: '197',
      period: 'one-time',
      items: [
        {
          title: 'Everything in Starter',
          description: 'All starter features included',
        },
        {
          title: 'Private Facebook Group',
          description: 'Join our exclusive community',
        },
        {
          title: 'Weekly Q&A Sessions',
          description: 'Live coaching and support',
        },
        {
          title: 'Bonus: Traffic Templates',
          description: 'Ready-to-use templates and scripts',
        },
        {
          title: 'Priority Support',
          description: 'Faster response times',
        },
      ],
      callToAction: {
        text: 'Get Professional',
        href: '/checkout',
        targetBlank: false,
      },
      hasRibbon: true,
      ribbonTitle: 'Popular',
    },
    {
      title: 'Enterprise',
      subtitle: 'For serious marketers',
      price: '497',
      period: 'one-time',
      items: [
        {
          title: 'Everything in Professional',
          description: 'All professional features included',
        },
        {
          title: '1-on-1 Coaching Session',
          description: 'Personal strategy session with our experts',
        },
        {
          title: 'Custom Traffic Strategy',
          description: 'Tailored approach for your niche',
        },
        {
          title: 'Advanced Tools & Software',
          description: 'Premium tools to accelerate your success',
        },
        {
          title: 'Lifetime Updates',
          description: 'Access to all future course updates',
        },
      ],
      callToAction: {
        text: 'Get Enterprise',
        href: '/checkout',
        targetBlank: false,
      },
      hasRibbon: false,
    },
  ],
};

// FAQs data on Home page *******************
export const faqsHome: FAQsProps = {
  id: 'faqs-on-home',
  hasBackground: false,
  header: {
    title: 'Frequently Asked Questions',
    subtitle: 'Get answers to common questions about ClickBank Marketing Secrets',
    tagline: 'FAQs',
  },
  items: [
    {
      title: 'Do I need any prior experience?',
      description: 'No prior experience is required. Our course is designed to take you from complete beginner to ClickBank success, with step-by-step instructions.',
    },
    {
      title: 'How long does it take to see results?',
      description: 'Most students start seeing their first sales within 30-60 days of implementing our strategies. Results vary based on your effort and consistency.',
    },
    {
      title: 'What if I don\'t see results?',
      description: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your results, we\'ll refund your investment, no questions asked.',
    },
    {
      title: 'Do you provide ongoing support?',
      description: 'Yes! You\'ll have access to our private Facebook group, weekly Q&A sessions, and email support to help you succeed.',
    },
    {
      title: 'Can I use these strategies for other affiliate programs?',
      description: 'Absolutely! While we focus on ClickBank, the traffic generation and conversion optimization techniques work for any affiliate program.',
    },
    {
      title: 'Is this a get-rich-quick scheme?',
      description: 'No, this is not a get-rich-quick scheme. It\'s a proven system that requires work and consistency, but can lead to significant income over time.',
    },
  ],
};

// Call to Action data on Home page *******************
export const callToActionHome: CallToActionProps = {
  id: 'call-to-action-on-home',
  hasBackground: true,
  header: {
    title: 'Ready to Start Your ClickBank Success Journey?',
    subtitle: 'Join thousands of successful marketers who have transformed their income with our proven strategies.',
  },
  callToAction: {
    text: 'Get Started Today',
    href: '/checkout',
    icon: IconDownload,
    targetBlank: false,
  },
}; 