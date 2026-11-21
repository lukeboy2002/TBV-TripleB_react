import {useTranslation} from "@/hooks/use-translation";
import {Head} from "@inertiajs/react";

export default function ScoreCreate() {
    const {t} = useTranslation();

    return (
        <>
            <Head title={t('Score')}/>
            <div className="p-4">
                <h1 className="font-heading text-2xl font-bold">
                    {t('Score')}
                </h1>
                <p className="text-muted-foreground">{t('Coming soon')}</p>
            </div>
        </>
    );
}
