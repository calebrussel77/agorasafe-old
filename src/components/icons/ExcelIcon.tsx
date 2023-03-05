import React from 'react';

function ExcelIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32">
      <defs>
        <linearGradient
          id="a"
          x1="4.494"
          x2="13.832"
          y1="-2092.086"
          y2="-2075.914"
          gradientTransform="translate(0 2100)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#18884f"></stop>
          <stop offset="0.5" stopColor="#117e43"></stop>
          <stop offset="1" stopColor="#0b6631"></stop>
        </linearGradient>
      </defs>
      <path
        fill="#185c37"
        d="M19.581 15.35L8.512 13.4v14.409A1.192 1.192 0 009.705 29h19.1A1.192 1.192 0 0030 27.809V22.5z"
      ></path>
      <path
        fill="#21a366"
        d="M19.581 3H9.705a1.192 1.192 0 00-1.193 1.191V9.5L19.581 16l5.861 1.95L30 16V9.5z"
      ></path>
      <path fill="#107c41" d="M8.512 9.5h11.069V16H8.512z"></path>
      <path
        d="M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 001.194-1.191V9.391A1.2 1.2 0 0016.434 8.2z"
        style={{ isolation: 'isolate' }}
        opacity="0.1"
      ></path>
      <path
        d="M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 001.194-1.191V10.041a1.2 1.2 0 00-1.194-1.191z"
        style={{ isolation: 'isolate' }}
        opacity="0.2"
      ></path>
      <path
        d="M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 001.194-1.191V10.041a1.2 1.2 0 00-1.194-1.191z"
        style={{ isolation: 'isolate' }}
        opacity="0.2"
      ></path>
      <path
        d="M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 001.194-1.191V10.041a1.2 1.2 0 00-1.194-1.191z"
        style={{ isolation: 'isolate' }}
        opacity="0.2"
      ></path>
      <path
        fill="url(#a)"
        d="M3.194 8.85h11.938a1.193 1.193 0 011.194 1.191v11.918a1.193 1.193 0 01-1.194 1.191H3.194A1.192 1.192 0 012 21.959V10.041A1.192 1.192 0 013.194 8.85z"
      ></path>
      <path
        fill="#fff"
        d="M5.7 19.873l2.511-3.884-2.3-3.862h1.847L9.013 14.6c.116.234.2.408.238.524h.017c.082-.188.169-.369.26-.546l1.342-2.447h1.7l-2.359 3.84 2.419 3.905h-1.809l-1.45-2.711A2.355 2.355 0 019.2 16.8h-.024a1.688 1.688 0 01-.168.351l-1.493 2.722z"
      ></path>
      <path
        fill="#33c481"
        d="M28.806 3h-9.225v6.5H30V4.191A1.192 1.192 0 0028.806 3z"
      ></path>
      <path fill="#107c41" d="M19.581 16H30v6.5H19.581z"></path>
    </svg>
  );
}

export default ExcelIcon;
