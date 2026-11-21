import { Link } from '@inertiajs/react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useTranslation } from '@/hooks/use-translation';
import { mainNavItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';

/**
 * Vaste menubalk onderin het scherm, alleen op de telefoon (md:hidden).
 */
export default function TriplebTabBar() {
    const { t } = useTranslation();
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <nav
            aria-label={t('Main menu')}
            className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden"
        >
            {mainNavItems.map((item) => {
                const Icon = item.icon;
                const active = isCurrentUrl(item.href);
                const label = t(item.shortTitle ?? item.title);

                // De grote ronde knop in het midden ("Score")
                if (item.highlight) {
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            prefetch
                            aria-label={t(item.title)}
                            className="flex flex-col items-center justify-end gap-0.5 pb-2 text-[11px] font-medium text-muted-foreground"
                        >
                            <span className="-mt-6 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
                                {Icon && (
                                    <Icon className="size-7" aria-hidden="true" />
                                )}
                            </span>
                            {label}
                        </Link>
                    );
                }

                // Een gewone tab
                return (
                    <Link
                        key={item.title}
                        href={item.href}
                        prefetch
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                            'flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium',
                            active
                                ? 'font-bold text-link'
                                : 'text-muted-foreground',
                        )}
                    >
                        {Icon && <Icon className="size-6" aria-hidden="true" />}
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}
