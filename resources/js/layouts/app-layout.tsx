import TriplebHeader from '@/components/tripleb-header';
import TriplebTabBar from '@/components/tripleb-tab-bar';
import type { AppLayoutProps } from '@/types';

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col bg-background">
            <TriplebHeader />
            {/* pb-28: ruimte onderin zodat de tabbalk niets afdekt (alleen telefoon) */}
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-28 md:pb-6">
                {children}
            </main>
            <TriplebTabBar />
        </div>
    );
}
