import clsx from 'clsx';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {ReactNode, useEffect, useState} from 'react';
import React, {Children} from 'react';
import {twMerge} from 'tailwind-merge';

type ActiveLinkProps = {
  children?: ReactNode;
  activeClassName?: string;
  className?: string;
  href: string;
  as?: string;
  replace?: any;
};

const ActiveLink = ({children, activeClassName, ...props}: ActiveLinkProps) => {
  const {asPath, isReady} = useRouter();

  const child: any = Children.only(children);
  const childClassName = child.props.className || '';
  const [className, setClassName] = useState(childClassName);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(props.as || props.href, location.href)
        .pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName = twMerge(
        childClassName,
        linkPathname === activePathname && activeClassName
        // linkPathname.includes(props.href || props.href) && activeClassName
      );

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    setClassName,
    className,
  ]);

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className
          ? `transition ease-in-out duration-300 ${className}`
          : null,
      })}
    </Link>
  );
};

export {ActiveLink};
