export type AuthSchema = {
    email: string,
    password: string,
    password_confirmation?: string,
    username?: string,
    name?: string,
}
export interface AuthError {
    email?: string,
    name?: string,
    username?: string,
    password?: string
}

export interface TodoType {
    id?: number;
    title: string;
    description: string;
    completed?: boolean;
    updatedAt?: string;
    createdAt?: string;
    dueDate?: string;
    status?: string;
    prioritized?: boolean;
}

export interface TodoError {
    title?: string;
    description?: string;
}
