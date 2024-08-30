import { MessageStatus, Thread } from "../types/Message";
import { User1, User2, User3, User4 } from "./DummyUsers";

export const Thread1: Thread = {
    threadID: 'thread1',
    users: [User3, User2],
    unread: true,
    messages: [
        {
            fromUser: User2,
            body: 'Hey, what time are you guys leaving',
            sent: 1724969185,
            status: MessageStatus.Sent,
            seen: false
        },
        {
            fromUser: User3,
            body: 'About to head out',
            sent: 1724969085,
            status: MessageStatus.Sent,
            seen: false
        },
        {
            fromUser: User3,
            body: 'Should be there around 7:30',
            sent: 1724969001,
            status: MessageStatus.Sent,
            seen: false
        },
        {
            fromUser: User2,
            body: 'What about you?',
            sent: 1724968020,
            status: MessageStatus.Sent,
            seen: false
        }
    ]
}

export const Thread2: Thread = {
    threadID: 'thread2',
    users: [User2],
    unread: true,
    messages: [
        {
            fromUser: User2,
            body: 'Hey did you want to go golfing saturday',
            sent: 1724968116,
            status: MessageStatus.Sent,
            seen: false
        },
        {
            fromUser: User1,
            body: 'Fur sure, what time?',
            sent: 1724968110,
            status: MessageStatus.Sent,
            seen: false
        },
        {
            fromUser: User2,
            body: '8am?',
            sent: 1724968097,
            status: MessageStatus.Sent,
            seen: false
        },
        {
            fromUser: User1,
            body: 'Sounds good!',
            sent: 1724968007,
            status: MessageStatus.Sent,
            seen: false
        }
    ]
}

export const Thread3: Thread = {
    threadID: 'thread3',
    users: [User2, User3, User4],
    unread: true,
    messages: [
        {
            fromUser: User1,
            body: 'Anyone want to play rocket leauge?',
            sent: 1724967007,
            status: MessageStatus.Sent,
            seen: false
        },
        {
            fromUser: User2,
            body: 'Im down',
            sent: 1724967057,
            status: MessageStatus.Sent,
            seen: false
        },
        {
            fromUser: User3,
            body: 'Im in',
            sent: 1724967097,
            status: MessageStatus.Sent,
            seen: false
        },
        {
            fromUser: User4,
            body: 'Sounds good!',
            sent: 1724967120,
            status: MessageStatus.Sent,
            seen: false
        }
    ]
}