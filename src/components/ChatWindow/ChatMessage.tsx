import React from 'react';
import { Box } from '@mui/material';
import { getTimeOfDay, getUserDislpayName } from '../../utils/utils';
import styled from '@emotion/styled';
import { Message } from '../../types/Message';
import { text_primary, text_secondary, text_accent } from '../../constants/colors';

interface ChatMessageProps {
    message: Message
}
export const ChatMessage = ({ message }: ChatMessageProps) => {
    const Container = styled(Box)`
    padding: 0  0 1rem 0;
    margin: 0;
    display: flex;
    width: 100%;
    flex-direction: column;
    `;

    const Header = styled(Box)`
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;
        width: 100%;
    `;

    const UserName = styled(Box)`
        display: flex;
        flex-shrink: 1;
        width: auto;
        color: ${text_secondary};
        font-size:.7rem;
        font-weight: bold;
    `;

    const Timestamp = styled(Box)`
        display: flex;
        font-size:.6rem;
        margin-left: .25rem;
        text-decoration: italic;
        color: ${text_accent};
    `;

    const Body = styled(Box)`
    padding: .5rem 0;
    font-size: 1.1rem;
    color: ${text_primary}
    `;

    return (
        <Container>
            <Header>
                <UserName>{getUserDislpayName(message.fromUser)}</UserName>
                <Timestamp>{getTimeOfDay(message.sent)}</Timestamp>
            </Header>
            <Body>{message.body}</Body>
        </Container>
    )
}