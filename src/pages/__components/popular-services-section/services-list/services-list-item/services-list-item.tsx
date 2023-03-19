import { ImageUI } from '@components/lib/image-ui/image-ui';

const ServicesListItem = ({ service }) => {
  return (
    <div className="group relative h-80 flex flex-col overflow-hidden cursor-pointer rounded-lg shadow-md">
      <ImageUI
        className="absolute h-full inset-0 object-cover"
        noNeedApiPrefix
        src={service?.imageUrl}
        name={service?.title}
      />
      <div className="absolute inset-0 group-hover:opacity-100 opacity-50 transition duration-300 bg-gradient-to-t from-gray-900/60 " />
      <p className="text-white absolute bottom-0 font-bold text-xl p-4 text-left mb-auto">
        {service?.title}
      </p>
    </div>
  );
};

export { ServicesListItem };
