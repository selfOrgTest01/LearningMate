import React, { useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Chat from '../Chat/index';
import { ChatZone, Section, StickyHeader } from './style';

const ChatList = ({ scrollbarRef, isReachingEnd, isEmpty, chatSections, setSize }) => {
  const onScroll = useCallback(
    (values) => {
      const scrollbar = scrollbarRef.current;

      if (scrollbar && values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
        setSize((size) => size + 1).then(() => {
          scrollbar.scrollTop(scrollbar.getScrollHeight() - values.scrollHeight);
        });
      }
    },
    [setSize, scrollbarRef, isReachingEnd, isEmpty],
  );

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
