import type { Auth } from '@/types/auth';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen?: boolean; // niet meer gedeeld; alleen nog voor de oude zijbalk-layout
            locale: string;
            translations: Record<string, string>;
            [key: string]: unknown;
        };
    }
}
