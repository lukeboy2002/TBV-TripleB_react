import {Link} from '@inertiajs/react';
import TriplebLogo from '@/components/tripleb-logo';
import {home} from '@/routes';
import type {AuthLayoutProps} from '@/types';
import {useTranslation} from '@/hooks/use-translation';

/**
 * Layout voor alle inlogschermen (inloggen, wachtwoord vergeten, enz.).
 *
 * Telefoon: bovenaan een donkere balk met het logo, daaronder het formulier.
 * Computer (vanaf "md", 768px): links het merkvlak, rechts het formulier.
 */
export default function AuthTriplebLayout({
                                              children,
                                              title,
                                              description,
                                          }: AuthLayoutProps) {
    const {t} = useTranslation();

    return (
        <div className="flex min-h-svh flex-col bg-background md:flex-row">
            {/* Merkvlak met logo */}
            <div
                className="flex flex-col items-center justify-center gap-4 bg-brand px-6 py-8 text-brand-foreground md:w-1/2 md:py-0">
                <Link href={home()} className="rounded-lg">
                    <TriplebLogo
                        variant="white"
                        className="h-28 w-auto md:h-56"
                    />
                    <span className="sr-only">{t('Go to the homepage')}</span>
                </Link>
                <p className="hidden font-heading text-lg font-semibold text-brand-foreground/80 md:block">
                    {t('Game among friends')}
                </p>
            </div>

            {/* Formulier */}
            <div className="flex flex-1 items-start justify-center p-6 md:items-center md:p-10">
                <div
                    className="w-full max-w-sm rounded-xl bg-card p-6 text-card-foreground shadow-sm ring-1 ring-border md:p-8">
                    <div className="mb-6 space-y-2 text-center">
                        <h1 className="font-heading text-2xl font-bold">
                            {/* De pagina geeft een Engelse tekst door; hier vertalen we die. */}
                            {title && t(title)}
                        </h1>
                        {description && (
                            <p className="text-sm text-muted-foreground">
                                {t(description)}
                            </p>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
