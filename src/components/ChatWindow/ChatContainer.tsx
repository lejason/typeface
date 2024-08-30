import React from 'react';
import { Box } from '@mui/material';
import { ChatHeader } from './ChatHeader';
import { ChatWindow } from './ChatWindow';
import styled from '@emotion/styled';
import { ChatTextInput } from './ChatTextInput';

const HeaderContainer = styled(Box)`
    height: 60px;
    flex-shrink: 0;
    box-sizing: border-box;`;

const BodyContainer = styled(Box)`
    flex-grow: 1;
    overflow-y: auto;`;

const InputContainer = styled(Box)`
    flex-shrink: 0;
    height: auto;
    margin-bottom: .5rem;`;


export const ChatContainer = () => {
    return (
        <>
            <HeaderContainer>
                <ChatHeader />
            </HeaderContainer>
            <BodyContainer>
                <ChatWindow />
            </BodyContainer>
            <InputContainer>
                <ChatTextInput />
            </InputContainer>
        </>
    )
}