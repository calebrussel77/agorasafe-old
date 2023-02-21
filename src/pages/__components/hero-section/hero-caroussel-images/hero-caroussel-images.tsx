import { Autoplay, EffectCube, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ImageUI } from '@components/lib/image-ui/image-ui';

const HERO_IMAGES = [
  {
    src: '/images/coiffeur-exterieur.jpg',
    name: 'agorasafe-image',
    alt: "Coiffeur exerçant à l'extérieur",
  },
  {
    src: '/images/femme-charpentière.jpg',
    name: 'agorasafe-image',
    alt: 'femme charpentière',
  },
  {
    src: '/images/coiffure-femme.jpg',
    name: 'agorasafe-image',
    alt: 'coiffure tresses pour femme',
  },
  {
    src: '/images/cordonnier-africain-02.jpg',
    name: 'agorasafe-image',
    alt: 'cordonnier africain',
  },
];

const HeroCarousselImages = () => {
  return (
    <div>
      <Swiper
        effect={'cube'}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
        }}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[Autoplay, EffectCube, Pagination]}
        className="mySwiper"
      >
        {HERO_IMAGES?.map((image, idx) => {
          return (
            <SwiperSlide key={idx}>
              <ImageUI
                noNeedApiPrefix
                src={image?.src}
                alt={image?.alt}
                name={image?.name}
                shape="rounded"
                className="h-[400px] w-full object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export { HeroCarousselImages };
