import React, { useMemo, useState } from 'react';
import { List, ListItem, Typography, IconButton, Menu, MenuItem, Box, Tooltip } from '@mui/material';
import { getThreadUsersDisplayName, getUniqueUsersSortedByFirstName, getUserDislpayName, sortUsersAlphabetically } from '../../utils/utils';
import { text_primary } from '../../constants/colors';
import styled from '@emotion/styled';
import { useThreadContext } from '../../hooks/Context';
import { Thread } from '../../types/Message';
import { AddBox, Clear } from '@mui/icons-material';
import { User } from '../../types/User';
import { Confirm } from '../Dialog/Confirm';

const Item = styled(Typography)`
  color: ${text_primary};
  font-size: 0.9rem;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex: 1;
  cursor: pointer;
`;

const Container = styled(Box)`
  position: relative;
  height: 100%;
`;

const AddButtonContainer = styled(Box)`
  position: absolute;
  bottom: 1.5rem;
  right: .5rem;
`;

const AddButton = styled(AddBox)`
  color: #eee;
  font-size: 42px;
  cursor: pointer;
`;

const UserMenuHeader = styled(Typography)`
  font-size: 14px;
  width: 180px;
  color: #111;
`;

const ListItemContainer = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  &:hover .clear-icon {
    visibility: visible;
  }
`;

const ClearButtonContainer = styled(IconButton)`
  visibility: hidden;
  position: absolute;
  right: 0;
`;

const ClearButton = styled(Clear)`
  cursor: pointer;
  font-size: 24px;
  color: #eee;
`

export const ThreadList = () => {
  const { threads, users, selectedThread, setSelectedThread, startThread, deleteThread } = useThreadContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (thread: Thread) => {
    if (thread) {
      setSelectedThread(thread);
    }
  };

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectUser = (user: User) => {
    startThread(user);
    handleClose()
  }

  const handleClearClick = (threadID: string) => {
    deleteThread(threadID);
  };

  const uniqueUsers = useMemo(() => sortUsersAlphabetically(users), [users]);

  return (
    <Container>
      <List>
        {threads.map((thread, index) => (
          <ListItemContainer key={index} sx={{ borderBottom: '1px solid #3f3f3f', padding: 0, margin: 0 }}>
            <Item
              sx={{
                fontWeight: thread.threadID === selectedThread?.threadID ? 'bold' : 'light',
                background: thread.threadID === selectedThread?.threadID ? '#444' : '',
              }}
              onClick={() => handleClick(thread)}
            >
              {getThreadUsersDisplayName(thread)}
            </Item>


            <ClearButtonContainer className="clear-icon">
              <Confirm
                onConfirm={() => handleClearClick(thread.threadID)}
                message="Are you sure you want to delete this entire thread?">
                <Tooltip title="Delete Thread">
                  <ClearButton />
                </Tooltip>
              </Confirm>
            </ClearButtonContainer>


          </ListItemContainer>
        ))}
      </List>

      {/* Add Button */}
      <AddButtonContainer>
        <IconButton onClick={handleAddClick}>
          <Tooltip title="Start a new chat">
            <AddButton />
          </Tooltip>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <MenuItem>
            <UserMenuHeader>
              Start chat with
            </UserMenuHeader>
          </MenuItem>
          {uniqueUsers.map(user => (
            <MenuItem key={user.userID} onClick={() => handleSelectUser(user)}>
              {getUserDislpayName(user)}
            </MenuItem>
          ))}
        </Menu>
      </AddButtonContainer>
    </Container>
  );
};
