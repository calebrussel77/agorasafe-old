import EmojiPicker from 'emoji-picker-react';

import {Popover} from '@components/lib/popover/popover';

export const EditorEmoji = ({popover, handleEmojiClick}) => (
  <Popover
    {...{...popover, state: popover.state}}
    portal={false}
    aria-label="click to open popover"
    className="bg-transparent border-none !max-h-fit !p-0"
  >
    <EmojiPicker onEmojiClick={handleEmojiClick} autoFocusSearch={false} />
  </Popover>
);
