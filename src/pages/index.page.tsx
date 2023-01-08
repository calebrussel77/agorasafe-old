/* eslint-disable @next/next/no-img-element */
import React, {ReactElement} from 'react';

import {Layout} from '@components/layouts/layouts';

import {CtaSection} from './__components/cta-section/cta-section';
import {FeatureSection} from './__components/feature-section/feature-section';
import {HeroSection} from './__components/hero-section/hero-section';
import {HomeBackground} from './__components/home-background/home-background';
import {PopularProviderServicesSection} from './__components/popular-provider-services-section/popular-provider-services-section';
import {PopularServicesSection} from './__components/popular-services-section/popular-services-section';

const Home = () => {
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

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
