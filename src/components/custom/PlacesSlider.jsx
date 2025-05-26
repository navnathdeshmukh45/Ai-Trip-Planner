import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const places = [
  {
    id: 1,
    image: '/src/assets/download (1).jpeg',
    title: 'Beautiful Destination 1'
  },
  {
    id: 2,
    image: '/src/assets/images (1).jpeg',
    title: 'Amazing Place 2'
  },
  {
    id: 3,
    image: '/src/assets/images.jpeg',
    title: 'Wonderful Place 3'
  },
  {
    id: 4,
    image: '/src/assets/download.jpeg',
    title: 'Stunning Location 4'
  },
  {
    id: 5,
    image: '/src/assets/download (2).jpeg',
    title: 'Scenic View 5'
  }
];

const PlacesSlider = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="rounded-lg shadow-lg"
      >
        {places.map((place) => (
          <SwiperSlide key={place.id}>
            <div className="relative">
              <img
                src={place.image}
                alt={place.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-xl font-semibold">{place.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PlacesSlider; 