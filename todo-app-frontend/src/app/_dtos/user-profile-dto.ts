export type ResponseData<T> = {
    userDetails: UserProfile,
    token: string
}

export interface UserProfile {
    userId: number;
    username: string;
}
