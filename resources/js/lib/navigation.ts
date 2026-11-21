import {CalendarDays, House, Plus, Trophy, Users} from 'lucide-react';
import {dashboard} from '@/routes';
import {index as agenda} from '@/routes/agenda';
import {index as players} from '@/routes/players';
import {index as ranking} from '@/routes/ranking';
import {create as createScore} from '@/routes/scores';
import type {NavItem} from '@/types';

/**
 * Het hoofdmenu. Wordt gebruikt door de kopbalk én de tabbalk.
 * De titels zijn Engels; het component vertaalt ze met t().
 */
export const mainNavItems: NavItem[] = [
    {title: 'Home', href: dashboard(), icon: House},
    {title: 'Agenda', href: agenda(), icon: CalendarDays},
    {title: 'Enter score', shortTitle: 'Score', href: createScore(), icon: Plus, highlight: true},
    {title: 'Ranking', href: ranking(), icon: Trophy},
    {title: 'Players', href: players(), icon: Users},
];
