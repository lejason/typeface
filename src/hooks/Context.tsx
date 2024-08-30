import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { Message, MessageStatus, Thread } from '../types/Message';
import { User } from '../types/User';
import { User1 } from './DummyUsers';

interface ThreadContextProps {
    threads: Thread[];
    selectedThread: Thread | null;
    setSelectedThread: (thread: Thread) => void;
    submitMessage: (threadID: string, message: string) => void;
    deleteMessage: (threadID: string, messageIndex: number) => void;
    createNewThread: (newThread: Thread) => void;
}


interface ThreadProviderProps {
    threads: Thread[];
    children: ReactNode;
    selectedThread: Thread | null;
}

const ThreadContext = createContext<ThreadContextProps>({
    threads: [],
    selectedThread: null,
    setSelectedThread: () => { },
    submitMessage: () => { },
    deleteMessage: () => { },
    createNewThread: () => { },
});

export const useThreadContext = () => useContext(ThreadContext);

export const ThreadProvider: React.FC<ThreadProviderProps> = ({ threads: initialThreads, children }) => {
    const [threads, setThreads] = useState<Thread[]>(() => {
        const savedThreads = localStorage.getItem('threads');
        return savedThreads ? JSON.parse(savedThreads) : initialThreads;
    });

    const [selectedThread, setSelectedThread] = useState<Thread | null>(threads[0] || null);
    useEffect(() => {
        localStorage.setItem('threads', JSON.stringify(threads));
    }, [threads]);


    const submitMessage = (threadID: string, messageText: string) => {

        /**
         * Note: 
         * Simulating concept of user actions is odd without a full blown notion of
         * auth/rbac so for now I will just hard-code to assume you are user1
         * */

        const ROOT_USER = User1;

        const newMessage: Message = {
            fromUser: ROOT_USER,
            body: messageText,
            sent: Date.now(),
            status: MessageStatus.Sent,
            seen: false,
        };

        setThreads(prevThreads =>
            prevThreads.map(thread =>
                thread.threadID === threadID
                    ? {
                        ...thread,
                        messages: [...thread.messages, newMessage],
                    }
                    : thread
            )
        );
        // Force re-render by setting selectedThread to the updated thread
        const updatedThread = threads.find(thread => thread.threadID === threadID);
        if (updatedThread) {
            setSelectedThread({ ...updatedThread, messages: [...updatedThread.messages, newMessage] });
        }
    };

    const deleteMessage = (threadID: string, messageIndex: number) => {
        setThreads(prevThreads =>
            prevThreads.map(thread =>
                thread.threadID === threadID
                    ? {
                        ...thread,
                        messages: thread.messages.filter((_, index) => index !== messageIndex),
                    }
                    : thread
            )
        );
    };

    const createNewThread = (newThread: Thread) => {
        setThreads(prevThreads => [...prevThreads, newThread]);
        setSelectedThread(newThread); // Optionally select the new thread
    };

    return (
        <ThreadContext.Provider value={{ threads, selectedThread, setSelectedThread, submitMessage, deleteMessage, createNewThread }}>
            {children}
        </ThreadContext.Provider>
    );
};
