import { usePage } from '@inertiajs/react';

type Replacements = Record<string, string | number>;

/**
 * Vertalingen in React, op dezelfde manier als __() in Laravel.
 *
 * In de code schrijf je Engels:   t('Log in')
 * De vertaling komt uit:          lang/nl.json  ->  "Log in": "Inloggen"
 *
 * Laravel stuurt de inhoud van lang/<taal>.json mee als de prop
 * "translations" (zie app/Http/Middleware/HandleInertiaRequests.php).
 * Staat een tekst er niet in, dan toont t() gewoon de Engelse tekst.
 *
 * Variabelen werken zoals in Laravel, met een dubbele punt:
 *   t('Welcome back, :name', { name: 'Antoine' })
 */
export function useTranslation() {
    const { translations } = usePage().props;

    const t = (key: string, replacements: Replacements = {}): string => {
        let text = translations[key] ?? key;

        for (const [name, value] of Object.entries(replacements)) {
            text = text.replaceAll(`:${name}`, String(value));
        }

        return text;
    };

    return { t };
}
