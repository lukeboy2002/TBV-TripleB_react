import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { AgendaEvent, EventTypeValue } from '@/types';

/**
 * One colour per event type.
 * Record<EventTypeValue, string> requires exactly one entry per type:
 * if a type is added later without a colour, TypeScript reports an error.
 * Class names are written out in full so Tailwind can find them.
 */
const colors: Record<EventTypeValue, string> = {
    game_night:
        'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300',
    outing: 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300',
    other: 'bg-gray-200 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300',
};

type Props = {
    event: AgendaEvent;
};

export default function EventTypeBadge({ event }: Props) {
    return (
        <Badge className={cn('border-transparent', colors[event.type])}>
            {event.type_label}
        </Badge>
    );
}
