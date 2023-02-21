import Link from 'next/link';
import {
  HiCheckCircle,
  HiOutlineLocationMarker,
  HiOutlineStar,
  HiStar,
} from 'react-icons/hi';

import { ImageUI } from '@components/lib/image-ui/image-ui';

const ServicesListItem = ({ service }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <ImageUI
        noNeedApiPrefix
        name={service?.title}
        className="h-48 w-full object-cover"
        src={service.imageUrl}
        alt={service?.title}
      />
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600">
            <Link href={service.category.href} className="hover:underline">
              {service.category.name}
            </Link>
          </p>
          <Link passHref href={service.href} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900 truncate whitespace-nowrap">
              {service.title}
            </p>
            <p className="mt-3 text-base text-gray-500 line-clamp-3">
              {service.preview}
            </p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <Link passHref href={service.author.href}>
              <span className="sr-only">{service.author.name}</span>
              <ImageUI
                name={service?.title}
                noNeedApiPrefix
                shape="circle"
                className="h-10 w-10 rounded-full"
                src={service.author.imageUrl}
                alt=""
              />
            </Link>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <Link
                passHref
                href={service.author.href}
                className="hover:underline flex space-x-1 items-center"
              >
                <span>{service.author.name}</span>
                {service?.isVerified && (
                  <HiCheckCircle className="h-4 w-4 text-green-500" />
                )}
              </Link>
            </p>
            <div className="text-gray-500 flex items-center gap-1">
              <HiStar className="h-3 w-3 text-yellow-500" />
              <HiStar className="h-3 w-3 text-yellow-500" />
              <HiStar className="h-3 w-3 text-yellow-500" />
              <HiOutlineStar className="h-3 w-3" />
              <HiOutlineStar className="h-3 w-3" />
            </div>
            <div className="flex space-x-1 items-center text-sm text-gray-500">
              <HiOutlineLocationMarker className="h-4 w-4" />
              <span>{service.location}</span>
              {/* <span aria-hidden="true">&middot;</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ServicesListItem };
