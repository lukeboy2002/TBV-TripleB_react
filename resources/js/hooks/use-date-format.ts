import {usePage} from '@inertiajs/react';

/**
 * Format dates in the site's language (locale from Laravel, e.g., "nl").
 *
 *   const date = useDateFormat();
 *   date.day('2026-12-12T20:00:00+01:00')   // "zaterdag 12 december"
 *   date.time('2026-12-12T20:00:00+01:00')  // "20:00"
 */

export function useDateFormat() {
    const {locale} = usePage().props;

    const format = (iso: string, options: Intl.DateTimeFormatOptions): string =>
        new Date(iso).toLocaleString(locale, options);

    return {
        day: (iso: string) =>
            format(iso, {weekday: 'long', day: 'numeric', month: 'long'}),
        dayWithYear: (iso: string) =>
            format(iso, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}),
        time: (iso: string) => format(iso, {hour: '2-digit', minute: '2-digit'}),
        monthShort: (iso: string) => format(iso, {month: 'short'}).replace('.', ''),
        dayNumber: (iso: string) => format(iso, {day: 'numeric'}),
    };
}
