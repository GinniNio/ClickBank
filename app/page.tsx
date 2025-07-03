import { Metadata } from 'next';
import Hero from '~/components/widgets/Hero';
import Features from '~/components/widgets/Features';
import Content from '~/components/widgets/Content';
import Testimonials from '~/components/widgets/Testimonials';
import Pricing from '~/components/widgets/Pricing';
import FAQs from '~/components/widgets/FAQs';
import CallToAction from '~/components/widgets/CallToAction';
import Header from '~/components/widgets/Header';
import Footer from '~/components/widgets/Footer';
import { heroHome, featuresHome, contentHomeOne, testimonialsHome, pricingHome, faqsHome, callToActionHome } from '~/shared/data/pages/home.data';

export const metadata: Metadata = {
  title: 'ClickBank Marketing Secrets - Unlock Your Digital Success',
  description: 'Discover proven ClickBank marketing strategies, tools, and techniques to boost your affiliate income. Join thousands of successful marketers today!',
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero {...heroHome} />
        <Features {...featuresHome} />
        <Content {...contentHomeOne} />
        <Testimonials {...testimonialsHome} />
        <Pricing {...pricingHome} />
        <FAQs {...faqsHome} />
        <CallToAction {...callToActionHome} />
      </main>
      <Footer />
    </>
  );
} 