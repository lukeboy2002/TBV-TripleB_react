import { Head } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

export default function AgendaIndex() {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('Agenda')} />
            <div className="p-4">
                <h1 className="font-heading text-2xl font-bold">
                    {t('Agenda')}
                </h1>
                <p className="text-muted-foreground">{t('Coming soon')}</p>
            </div>
        </>
    );
}
