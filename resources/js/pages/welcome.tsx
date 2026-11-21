import { Head, Link, usePage } from '@inertiajs/react';
import TriplebLogo from '@/components/tripleb-logo';
import { dashboard, login } from '@/routes';
import { useTranslation } from '@/hooks/use-translation';

/**
 * De openingspagina voor wie nog niet is ingelogd.
 * Er is bewust geen "Registreren"-knop: TripleB werkt alleen op uitnodiging.
 */
export default function Welcome() {
    const { t } = useTranslation();

    // usePage().props bevat de gegevens die Laravel meestuurt,
    // zoals de ingelogde gebruiker (auth.user).
    const { auth } = usePage().props;

    return (
        <>
            <Head title={t('Welcome')} />
            <div className="flex min-h-svh flex-col items-center justify-center gap-8 bg-brand p-6 text-center text-brand-foreground">
                <TriplebLogo variant="white" className="h-48 w-auto md:h-72" />

                <div className="space-y-2">
                    <h1 className="font-heading text-3xl font-bold md:text-4xl">
                        TBV TripleB
                    </h1>
                    <p className="text-brand-foreground/80">
                        {t('Schotelbiljart among friends')}
                    </p>
                </div>

                <Link
                    href={auth.user ? dashboard() : login()}
                    className="inline-flex h-12 items-center rounded-lg bg-primary px-8 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                    {auth.user ? t('Dashboard') : t('Log in')}
                </Link>
            </div>
        </>
    );
}
