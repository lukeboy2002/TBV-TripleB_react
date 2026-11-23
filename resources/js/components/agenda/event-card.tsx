import {Link} from '@inertiajs/react';
import EventTypeBadge from '@/components/agenda/event-type-badge';
import {useDateFormat} from '@/hooks/use-date-format';
import {show} from '@/routes/agenda';
import type {AgendaEvent} from '@/types';

type Props = {
    event: AgendaEvent;
};

export default function EventCard({event}: Props) {
    const date = useDateFormat();

    return (
        <Link
            href={show(event.slug)}
            className="flex gap-4 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border transition hover:ring-primary"
        >
            {/* Datumblokje: maand + dag */}
            <div
                className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-brand-foreground">
                <span className="text-xs font-semibold uppercase">
                    {date.monthShort(event.starts_at)}
                </span>
                <span className="font-heading text-2xl leading-none font-bold">
                    {date.dayNumber(event.starts_at)}
                </span>
            </div>

            <div className="min-w-0 flex-1 space-y-1">
                <h3 className="truncate font-heading text-lg font-bold">
                    {event.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {event.is_multi_day && event.ends_at
                        ? `${date.day(event.starts_at)} – ${date.day(event.ends_at)}`
                        : `${date.day(event.starts_at)} · ${date.time(event.starts_at)}`}
                </p>
                <EventTypeBadge event={event}/>
            </div>
        </Link>
    );
}
