import React from 'react';
import { List, ListItem } from '@mui/material';
import { ChatMessage } from './ChatMessage';
import { useThreadContext } from '../../hooks/Context';

export const ChatWindow = () => {

  const { selectedThread } = useThreadContext();

  if (!selectedThread) {
    console.log("SELECTED THREAD IS NULL")
    return null;
  }

  return <List>
    {selectedThread.messages.map((message, index) => (
      <ListItem key={index} sx={{ padding: 0, magin: 0 }}>
        <ChatMessage message={message} parentThreadID={selectedThread.threadID} messageIndex={index} />
      </ListItem>
    ))}
  </List >
}