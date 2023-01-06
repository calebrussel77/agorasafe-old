/* eslint-disable @next/next/no-img-element */
import React, {ReactElement} from 'react';

import {Layout} from '@components/layouts/layouts';

import {FeatureSection} from './__components/feature-section/feature-section';
import {HeroSection} from './__components/hero-section/hero-section';
import {HomeBackground} from './__components/home-background/home-background';

const Home = () => {
  return (
    <div className="isolate overflow-x-hidden">
      <HomeBackground />
      <section className="relative pt-4 lg:overflow-hidden lg:pb-14">
        <div className="mx-auto max-w-screen-2xl lg:px-8">
          <HeroSection />
        </div>
      </section>
      <FeatureSection />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
