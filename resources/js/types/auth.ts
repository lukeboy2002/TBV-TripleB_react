export type User = {
    id: number;
    name: string;
    username: string | null;
    email: string;
    is_admin: boolean;
    avatar?: string;
    email_verified_at: string | null;
};

export type Auth = {
    user: User;
};

export type Passkey = {
    id: number;
    name: string;
    authenticator: string | null;
    created_at_diff: string;
    last_used_at_diff: string | null;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
