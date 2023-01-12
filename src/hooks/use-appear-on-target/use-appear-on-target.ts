import {MutableRefObject, useEffect, useRef, useState} from 'react';

type IUseAppearOnTarget = {
  targetedRef?: MutableRefObject<HTMLElement>;
  elementRef: MutableRefObject<HTMLElement>;
  targetedSelector?: string;
  classNameList: string[];
  options?: IntersectionObserverInit;
};

const useAppearOnTarget = ({
  options,
  elementRef,
  targetedRef,
  targetedSelector,
  classNameList,
}: IUseAppearOnTarget) => {
  const [isAppear, setIsAppear] = useState(false);

  useEffect(() => {
    const targetedElement = document.querySelector(targetedSelector);
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          setIsAppear(true);
          elementRef?.current?.classList?.add(...classNameList);
        } else {
          setIsAppear(false);
          elementRef?.current?.classList?.remove(...classNameList);
        }
      });
    }, options);

    sectionObserver?.observe(targetedElement || targetedRef?.current);
  });

  return {isAppear, setIsAppear, elementRef};
};

export {useAppearOnTarget};
