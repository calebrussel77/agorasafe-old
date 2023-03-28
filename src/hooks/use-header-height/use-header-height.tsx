import { useEffect, useRef } from 'react';

const useHeaderHeight = (defaultHeight = 120) => {
  const headerHeight = useRef(null);

  useEffect(() => {
    const headerElement = document?.querySelector('header');
    headerHeight.current = headerElement?.clientHeight || defaultHeight;
  });

  return { height: headerHeight.current };
};

export { useHeaderHeight };
