import React, { ReactElement } from 'react';

import { HomeBackground } from '@components/home-background/home-background';
import { Layout } from '@components/layouts/layouts';

import { CtaSection } from './__components/cta-section/cta-section';
import { FeatureSection } from './__components/feature-section/feature-section';
import { HeroSection } from './__components/hero-section/hero-section';
import { PopularProviderServicesSection } from './__components/popular-provider-services-section/popular-provider-services-section';
import { PopularServicesSection } from './__components/popular-services-section/popular-services-section';

const HomePage = () => {
  return (
    <div className="isolate overflow-x-hidden">
      <HomeBackground />
      <HeroSection />
      <PopularServicesSection />
      <FeatureSection />
      <PopularProviderServicesSection />
      <CtaSection />
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
