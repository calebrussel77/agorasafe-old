import React, { FC } from 'react';

type TLogoSymbolIconProps = {
  className?: string;
};

const LogoSymbolIcon: FC<TLogoSymbolIconProps> = ({ className }) => {
  return (
    <svg className={className} fill="none" viewBox="0 0 22 21">
      <path
        fill="url(#paint0_linear_103_386)"
        fillRule="evenodd"
        d="M20.937 15.008C19.17 18.552 15.384 21 11 21 4.925 21 0 16.299 0 10.5c0-1.349.266-2.638.752-3.823L2.477 8.1a5.604 5.604 0 011.946 3.24c.623 3.164 3.24 5.593 6.558 6.087l1.272.19a10.31 10.31 0 007.307-1.67l1.377-.938zm.956-3.037l-3.5 2.386a8.183 8.183 0 01-5.8 1.325l-1.271-.19c-2.476-.369-4.428-2.18-4.893-4.54a7.512 7.512 0 00-2.608-4.343l-.769-.634.507.14A7.076 7.076 0 016.94 8.21a9.093 9.093 0 006.45 3.005l.256.009a10.04 10.04 0 006.42-2.033l1.613-1.22a10.073 10.073 0 01.214 4zM11 0C7.612 0 4.582 1.462 2.564 3.761l1.567.435a9.04 9.04 0 014.32 2.675A7.117 7.117 0 0013.5 9.223l.255.01a7.994 7.994 0 005.111-1.62l2.09-1.582C19.199 2.467 15.402 0 11 0z"
        clipRule="evenodd"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_103_386"
          x1="11"
          x2="11"
          y1="0"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#354CD0"></stop>
          <stop offset="1" stopColor="#AA50A8"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export { LogoSymbolIcon };
