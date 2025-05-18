import { Message } from 'ai';
import React, { memo, useMemo } from 'react';
import Markdown from 'react-markdown';
import ToolView from '../tool-view';

const MessageBlock = memo(({ message }: { message: Message }) => {
  const renderContent = useMemo(() => {
    return (
      message?.parts?.map((part, i) => {
        switch (part.type) {
          case 'text':
            return <Markdown key={`${message.id}-${i}`}>{part.text}</Markdown>;
          case 'tool-invocation':
            return (
              <ToolView
                toolInvocation={part.toolInvocation}
                key={`${message.id}-${i}`}
              />
            );
        }
      }) ?? null
    );
  }, [message]);

  return <>{renderContent}</>;
});

MessageBlock.displayName = 'MessageBlock';

export default MessageBlock;
