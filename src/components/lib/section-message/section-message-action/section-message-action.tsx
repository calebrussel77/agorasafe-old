import Link from 'next/link';
import React, {ReactNode, memo} from 'react';

type MessageActionProps = {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
};

const MessageAction = memo(function MessageAction({
  children,
  onClick,
  href,
}: MessageActionProps) {
  return onClick ? (
    <button
      className="text-primary-600 font-semibold hover:underline"
      onClick={onClick}
    >
      {children}
    </button>
  ) : href ? (
    <Link href={href}>
      <a>
        <button
          className="text-primary-600 font-semibold hover:underline"
          onClick={onClick}
        >
          {children}
        </button>
      </a>
    </Link>
  ) : (
    <>{children}</>
  );
});

MessageAction.displayName = 'MessageAction';

export {MessageAction};
