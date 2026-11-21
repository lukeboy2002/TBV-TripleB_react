import { Link, usePage } from '@inertiajs/react';
import TriplebLogo from '@/components/tripleb-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { useTranslation } from '@/hooks/use-translation';
import { mainNavItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';

export default function TriplebHeader() {
    const { auth } = usePage().props;
    const { t } = useTranslation();
    const { isCurrentUrl } = useCurrentUrl();
    const getInitials = useInitials();

    return (
        <header className="bg-brand text-brand-foreground">
            <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
                {/* Logo, linkt naar de startpagina */}
                <Link href={dashboard()} className="flex items-center gap-3">
                    <TriplebLogo variant="white" className="h-11 w-auto" />
                    <span className="font-heading text-lg font-bold">
                        TBV TripleB
                    </span>
                </Link>

                {/* Menu: verborgen op de telefoon, zichtbaar vanaf md (768px) */}
                <nav
                    aria-label={t('Main menu')}
                    className="hidden flex-1 items-center gap-1 md:flex"
                >
                    {mainNavItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            prefetch
                            className={cn(
                                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                item.highlight
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                    : 'hover:bg-white/10',
                                isCurrentUrl(item.href) &&
                                    !item.highlight &&
                                    'bg-white/15',
                            )}
                        >
                            {t(item.title)}
                        </Link>
                    ))}
                </nav>

                {/* Rondje met initialen; klik opent Instellingen / Uitloggen */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        aria-label={t('My account')}
                        className="ml-auto rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                        <Avatar className="size-10 border-2 border-brand-foreground">
                            <AvatarImage
                                src={auth.user.avatar}
                                alt={auth.user.name}
                            />
                            <AvatarFallback className="bg-brand font-semibold text-brand-foreground">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
