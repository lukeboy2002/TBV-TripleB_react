import {Head} from '@inertiajs/react';
import EventForm from '@/components/agenda/event-form';
import {useTranslation} from '@/hooks/use-translation';
import type {EventTypeOption} from '@/types';

type Props = {
    types: EventTypeOption[];
};

export default function AgendaCreate({types}: Props) {
    const {t} = useTranslation();

    return (
        <>
            <Head title={t('New event')}/>

            <div className="mx-auto max-w-2xl space-y-6">
                <h1 className="font-heading text-2xl font-bold">{t('New event')}</h1>

                <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border md:p-6">
                    <EventForm types={types}/>
                </div>
            </div>
        </>
    );
}
