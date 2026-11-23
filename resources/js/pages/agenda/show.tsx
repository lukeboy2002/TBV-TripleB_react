import {Head, Link} from '@inertiajs/react';
import {ArrowLeft, CalendarDays, Clock, Pencil, User} from 'lucide-react';
import DeleteEventButton from '@/components/agenda/delete-event-button';
import EventTypeBadge from '@/components/agenda/event-type-badge';
import {Button} from '@/components/ui/button';
import {useDateFormat} from '@/hooks/use-date-format';
import {useTranslation} from '@/hooks/use-translation';
import {edit, index} from '@/routes/agenda';
import type {AgendaEvent, Resource} from '@/types';

type Props = {
    event: Resource<AgendaEvent>;
};

export default function AgendaShow({event: resource}: Props) {
    const event = resource.data;
    const {t} = useTranslation();
    const date = useDateFormat();

    return (
        <>
            <Head title={event.name}/>

            <div className="mx-auto max-w-2xl space-y-6">
                <Link
                    href={index()}
                    className="inline-flex items-center gap-1 text-sm font-medium text-link"
                >
                    <ArrowLeft className="size-4"/>
                    {t('Back to agenda')}
                </Link>

                <article className="space-y-5 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                    <div className="space-y-2">
                        <EventTypeBadge event={event} />
                        <h1 className="font-heading text-3xl font-bold">{event.name}</h1>
                    </div>

                    <dl className="grid gap-3 text-sm sm:grid-cols-2">
                        <div className="flex items-start gap-2">
                            <CalendarDays className="mt-0.5 size-4 text-muted-foreground"/>
                            <div>
                                <dt className="sr-only">{t('Date')}</dt>
                                <dd>
                                    {event.is_multi_day && event.ends_at
                                        ? `${date.dayWithYear(event.starts_at)} – ${date.dayWithYear(event.ends_at)}`
                                        : date.dayWithYear(event.starts_at)}
                                </dd>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Clock className="mt-0.5 size-4 text-muted-foreground"/>
                            <div>
                                <dt className="sr-only">{t('Time')}</dt>
                                <dd>{date.time(event.starts_at)}</dd>
                            </div>
                        </div>

                        {event.user && (
                            <div className="flex items-start gap-2">
                                <User className="mt-0.5 size-4 text-muted-foreground"/>
                                <div>
                                    <dt className="sr-only">{t('Organiser')}</dt>
                                    <dd>{t('Organised by :name', {name: event.user.name})}</dd>
                                </div>
                            </div>
                        )}
                    </dl>

                    <p className="whitespace-pre-line">{event.description}</p>

                    {(event.can.update || event.can.delete) && (
                        <div className="flex flex-wrap gap-2 border-t pt-4">
                            {event.can.update && (
                                <Button variant="secondary" asChild>
                                    <Link href={edit(event.slug)}>
                                        <Pencil/>
                                        {t('Edit')}
                                    </Link>
                                </Button>
                            )}
                            {event.can.delete && <DeleteEventButton event={event}/>}
                        </div>
                    )}
                </article>
            </div>
        </>
    );
}
