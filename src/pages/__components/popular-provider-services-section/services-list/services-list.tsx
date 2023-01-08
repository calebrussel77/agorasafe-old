import {useRef} from 'react';
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs';
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {ServicesListItem} from './services-list-item/services-list-item';

const ServicesList = ({services}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full">
      <div className="relative">
        <button
          className="absolute z-10 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg bg-gray-500 rounded-full border border-gray-600 text-white -left-5 top-1/2"
          ref={prevRef}
        >
          <BsArrowLeftCircleFill className="h-10 w-10" />
        </button>
        <Swiper
          onInit={swiper => {
            (swiper.params.navigation as any).prevEl = prevRef.current;
            (swiper.params.navigation as any).nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current ? prevRef.current : undefined,
            nextEl: nextRef.current ? nextRef.current : undefined,
          }}
          updateOnWindowResize
          breakpoints={{
            550: {
              slidesPerView: 2,
            },
            1180: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
            1500: {
              slidesPerView: 4,
            },
            2500: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          style={{padding: '6px 0'}}
          className="mySwiper"
        >
          {services.map(service => (
            <SwiperSlide key={service.id}>
              <ServicesListItem service={service} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className="absolute z-10 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-gray-500 rounded-full border border-gray-600 text-white -right-5 top-1/2"
          ref={nextRef}
        >
          <BsArrowRightCircleFill className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export {ServicesList};
