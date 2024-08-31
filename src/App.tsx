import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ThreadList } from './components/ThreadList/ThreadList';
import { Thread } from './types/Message';
import { Thread1, Thread2, Thread3 } from './hooks/DummyThread';
import { ChatContainer } from './components/ChatWindow/ChatContainer';
import { COLORS } from './constants/colors';
import { ThreadProvider } from './hooks/Context';
import { User } from './types/User';
import { User2, User3, User4, User5, User6 } from './hooks/DummyUsers';

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
  background-color: ${COLORS.background.dark}
`;

export const ThreadContainer = styled(Box)`
  width: 260px;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: ${COLORS.background.viewThreads};
  border-right: 1px solid ${COLORS.borders.primary};
`

export const ChatWindowContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 1rem 1rem 1rem 2rem;
  box-sizing: border-box;
  background-color: ${COLORS.background.viewChatWindow}
`

function App() {

  // Assume this is hydrated from a hook/API, etc.
  const InitThreads: Thread[] = [
    Thread1,
    Thread2,
    Thread3
  ];

  const InitUsers: User[] = [
    User2, User3, User4, User5, User6
  ]

  return (
    <div className="App">
      <ThreadProvider users={InitUsers} threads={InitThreads} selectedThread={InitThreads[0]}>
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
