type User = {
    username: string;
    firstname: string;
    lastname: string;
    elo: number;
    photoURL: string;
};

const getRank = (user: User) => {
    return -1;
};

export type { User };
export default getRank;
