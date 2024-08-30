import { Thread } from "../types/Message";
import { User } from "../types/User";

export const getThreadUsersDisplayName = (thread: Thread): string => {
    const userNames = thread.users.map(user => user.firstName);
    if (userNames.length === 1) {
        return `${thread.users[0].firstName} ${thread.users[0].lastName}`;
    } else if (userNames.length === 2) {
        return `${userNames[0]} & ${userNames[1]}`;
    } else if (userNames.length > 2) {
        const lastUser = userNames.pop();
        return `${userNames.join(', ')} and ${lastUser}`;
    }
    return '';
};

export const getUserDislpayName = (user: User, showOnlyFirstName: boolean = false) => {
    return showOnlyFirstName ? user.firstName : `${user.firstName} ${user.lastName}`
}

export const getTimeOfDay = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutesStr}${ampm}`;
}

export const getUniqueUsersSortedByFirstName = (threads: Thread[]): User[] => {
    const userMap: { [key: string]: User } = {};
    threads.forEach(thread => {
        thread.users.forEach(user => {
            if (!userMap[user.userID]) {
                userMap[user.userID] = user;
            }
        });
    });
    return Object.values(userMap).sort((a, b) => a.firstName.localeCompare(b.firstName));
}


