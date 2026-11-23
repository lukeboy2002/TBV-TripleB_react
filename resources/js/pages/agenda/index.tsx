import {Head, Link} from '@inertiajs/react';
import {Plus} from 'lucide-react';
import EventCard from '@/components/agenda/event-card';
import {Button} from '@/components/ui/button';
import {useTranslation} from '@/hooks/use-translation';
import {create} from '@/routes/agenda';
import type {AgendaEvent, Resource} from '@/types';

type Props = {
    upcoming: Resource<AgendaEvent[]>;
    past: Resource<AgendaEvent[]>;
    canCreate: boolean;
};

export default function AgendaIndex({upcoming, past, canCreate}: Props) {
    const {t} = useTranslation();

    return (
        <>
            <Head title={t('Agenda')}/>

            <div className="space-y-8">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="font-heading text-2xl font-bold">{t('Agenda')}</h1>
                    {canCreate && (
                        <Button asChild>
                            <Link href={create()}>
                                <Plus/>
                                {t('New event')}
                            </Link>
                        </Button>
                    )}
                </div>

                <section className="space-y-3">
                    <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                        {t('Upcoming')}
                    </h2>

                    {upcoming.data.length === 0 ? (
                        <p className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">
                            {t('No events planned yet.')}
                        </p>
                    ) : (
                        <div className="grid gap-3 md:grid-cols-2">
                            {upcoming.data.map((event) => (
                                <EventCard key={event.id} event={event}/>
                            ))}
                        </div>
                    )}
                </section>

                {past.data.length > 0 && (
                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                            {t('Past')}
                        </h2>
                        <div className="grid gap-3 opacity-75 md:grid-cols-2">
                            {past.data.map((event) => (
                                <EventCard key={event.id} event={event}/>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
