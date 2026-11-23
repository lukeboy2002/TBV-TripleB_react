/**
 * The possible event types (same values as the PHP enum App\Enums\EventType).
 */
export type EventTypeValue = 'game_night' | 'outing' | 'other';
export type EventTypeOption = {
    value: EventTypeValue;
    label: string;
};
/**
 * An event, as sent to React by something like EventResource (Laravel).
 * It is named "AgendaEvent" rather than "Event" because the browser already has a built-in "Event" type (for clicks, keystrokes, etc.).
 */
export type AgendaEvent = {
    id: number;
    slug: string;
    name: string;
    description: string;
    type: EventTypeValue;
    type_label: string;
    starts_at: string; // ISO-datum, bijv. "2026-12-12T20:00:00+01:00"
    ends_at: string | null;
    is_multi_day: boolean;
    icon: string | null;
    image_url: string | null;
    user?: { id: number; name: string } | null;
    can: { update: boolean; delete: boolean };
};

/**
 * Laravel wraps an API Resource in { data: ... }.
 * Therefore, Resource<AgendaEvent[]> means: { data: AgendaEvent[] }
 */
export type Resource<T> = {
    data: T;
};
