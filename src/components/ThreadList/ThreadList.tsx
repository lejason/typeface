import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { getThreadUsersDisplayName } from '../../utils/utils';
import { text_primary } from '../../constants/colors';
import styled from '@emotion/styled';
import { useThreadContext } from '../../hooks/Context';
import { Thread } from '../../types/Message';

const Item = styled(Typography)`
  color:${text_primary};
  font-size:.9rem;
  padding: 1rem;
  width: 100%;
  display; flex;
  flex:1;
  cursor: pointer;
`;

export const ThreadList = () => {

  const { threads, selectedThread, setSelectedThread } = useThreadContext()

  const handleClick = (thread: Thread) => {
    if (thread) {
      setSelectedThread(thread)
    }
  }

  return <List>
    {threads.map((thread, index) => (
      <ListItem key={index} sx={{ borderBottom: '1px solid #3f3f3f', padding: 0, margin: 0 }}>
        <Item
          sx={{
            fontWeight: thread.threadID === selectedThread?.threadID ? 'bold' : 'light',
            background: thread.threadID === selectedThread?.threadID ? '#444' : '',
          }}
          onClick={() => handleClick(thread)}
        >
          {getThreadUsersDisplayName(thread)}
        </Item>
      </ListItem>
    ))}
  </List >
}