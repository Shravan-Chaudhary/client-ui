import { cookies } from "next/headers";

export enum Roles {
    ADMIN = "admin",
    MANAGER = "manager",
    CUSTOMER = "customer",
}

export interface Session {
    user: User;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Roles.ADMIN | Roles.MANAGER | Roles.CUSTOMER;
    tenant?: number | null;
}

export const getSession = async () => {
    return await getSelf();
};

export const getSelf = async (): Promise<Session | null> => {
    // TODO: Use env for backend url
    const response = await fetch(`https://api.epicfood.live/api/v1/auth/api/v1/auth/self`, {
        headers: {
            Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
    });

    if (!response.ok) {
        return null;
    }
    //TODO: Might get error in future if the response structure of auth service is updated, then update the object structure here
    const user = (await response.json()) as User;
    return {
        user,
    };
};
