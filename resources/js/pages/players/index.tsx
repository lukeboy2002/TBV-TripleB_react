import {useTranslation} from "@/hooks/use-translation";
import {Head} from "@inertiajs/react";

export default function PlayerIndex() {
    const {t} = useTranslation();

    return (
        <>
            <Head title={t('Players')}/>
            <div className="p-4">
                <h1 className="font-heading text-2xl font-bold">
                    {t('Players')}
                </h1>
                <p className="text-muted-foreground">{t('Coming soon')}</p>
            </div>
        </>
    );
}
