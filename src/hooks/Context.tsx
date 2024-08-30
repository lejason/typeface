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
    startThread: (user: User) => void;
    deleteThread: (threadID: string) => void;
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
    startThread: () => { },
    deleteThread: () => { },
});

export const useThreadContext = () => useContext(ThreadContext);

export const ThreadProvider: React.FC<ThreadProviderProps> = ({ threads: initialThreads, children }) => {

    const [threads, setThreads] = useState<Thread[]>(() => {
        const savedThreads = localStorage.getItem('threads');
        return savedThreads ? JSON.parse(savedThreads) : initialThreads;
    });

    const [selectedThread, setSelectedThread] = useState<Thread | null>(threads[0] || null);

    /**
     * Note: 
     * It's odd without a BE, so for the sake of some sort of persistent state
     * I added localStorage
     * */
    useEffect(() => {
        localStorage.setItem('threads', JSON.stringify(threads));
    }, [threads]);

    /**
     * Note: 
     * Simulating auth'ed actions are also odd without a full blown notion of auth/rbac
     * so for now I will just hard-code
     * 
     * tdlr; assume you are CURRENT_USER (John Doe) and have full perms
     * */
    const CURRENT_USER = User1;

    const startThread = (user: User) => {
        const newThread: Thread = {
            threadID: `thread-${Date.now()}`,
            users: [CURRENT_USER, user],
            unread: false,
            messages: [],
        };

        setThreads(prevThreads => [...prevThreads, newThread]);
        setSelectedThread(newThread);
    };

    const submitMessage = (threadID: string, messageText: string) => {
        const newMessage: Message = {
            fromUser: CURRENT_USER,
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

        const updatedThread = threads.find(thread => thread.threadID === threadID);
        if (updatedThread) {
            setSelectedThread({ ...updatedThread, messages: [...updatedThread.messages, newMessage] });
        }
    };

    const deleteMessage = (threadID: string, messageIndex: number) => {
        setThreads(prevThreads => {
            const updatedThreads = prevThreads.map(thread =>
                thread.threadID === threadID
                    ? {
                        ...thread,
                        messages: thread.messages.filter((_, index) => index !== messageIndex),
                    }
                    : thread
            );

            const updatedThread = updatedThreads.find(thread => thread.threadID === threadID);
            if (updatedThread) {
                setSelectedThread({ ...updatedThread, messages: [...updatedThread.messages] });
            }

            return updatedThreads;
        });
    };

    const deleteThread = (threadID: string) => {
        setThreads(prevThreads => {
            const updatedThreads = prevThreads.filter(thread => thread.threadID !== threadID);
            if (selectedThread?.threadID === threadID) {
                setSelectedThread(updatedThreads.length > 0 ? updatedThreads[0] : null);
            } else {
                const newSelectedThread = updatedThreads.find(thread => thread.threadID === selectedThread?.threadID) || null;
                setSelectedThread(newSelectedThread);
            }

            return updatedThreads;
        });
    };


    const createNewThread = (newThread: Thread) => {
        setThreads(prevThreads => [...prevThreads, newThread]);
        setSelectedThread(newThread); // This was a choice; seemed like better UX?
    };

    return (
        <ThreadContext.Provider value={{ threads, selectedThread, setSelectedThread, submitMessage, deleteMessage, createNewThread, startThread, deleteThread }}>
            {children}
        </ThreadContext.Provider>
    );
};
