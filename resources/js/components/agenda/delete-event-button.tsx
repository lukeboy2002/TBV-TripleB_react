import {Link} from '@inertiajs/react';
import {Trash2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {useTranslation} from '@/hooks/use-translation';
import {destroy} from '@/routes/agenda';
import type {AgendaEvent} from '@/types';

type Props = {
    event: AgendaEvent;
};

export default function DeleteEventButton({event}: Props) {
    const {t} = useTranslation();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2/>
                    {t('Delete')}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>{t('Delete event?')}</DialogTitle>
                <DialogDescription>
                    {t(':name will be removed from the agenda. This cannot be undone.', {
                        name: event.name,
                    })}
                </DialogDescription>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">{t('Cancel')}</Button>
                    </DialogClose>
                    <Button variant="destructive" asChild>
                        <Link href={destroy(event.slug)} as="button">
                            {t('Delete')}
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
