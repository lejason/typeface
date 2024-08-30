import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ThreadList } from './components/ThreadList/ThreadList';
import { Thread } from './types/Message';
import { Thread1, Thread2, Thread3 } from './hooks/DummyThread';
import { ChatContainer } from './components/ChatWindow/ChatContainer';
import { backgroundThreads, backgroundWindow, borders } from './constants/colors';
import { ThreadProvider } from './hooks/Context';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f0f2f5;
`;

export const ThreadContainer = styled(Box)`
  width: 260px;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: ${backgroundThreads};
  border-right: 1px solid ${borders};
`

export const ChatWindowContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
  background-color: ${backgroundWindow}
`

function App() {

  // Assume this is from a hook
  const threads: Thread[] = [
    Thread1,
    Thread2,
    Thread3
  ];

  return (
    <div className="App">
      <ThreadProvider threads={threads} selectedThread={threads[0]}>
        <Container>
          <ThreadContainer>
            <ThreadList />
          </ThreadContainer>
          <ChatWindowContainer>
            <ChatContainer />
          </ChatWindowContainer>
        </Container>
      </ThreadProvider>
    </div>
  );
}

export default App;
