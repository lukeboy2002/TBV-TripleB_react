import {Form, Link} from '@inertiajs/react';
import InputError from '@/components/input-error';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useTranslation} from '@/hooks/use-translation';
import {index, show, store, update} from '@/routes/agenda';
import type {AgendaEvent, EventTypeOption} from '@/types';

type Props = {
    event?: AgendaEvent; // leeg bij "nieuw", gevuld bij "bewerken"
    types: EventTypeOption[];
};

export default function EventForm({event, types}: Props) {
    const {t} = useTranslation();

    // Bestaat er al een event? Dan bijwerken (PUT), anders nieuw opslaan (POST).
    const formRoute = event ? update.form(event.slug) : store.form();
    const cancelHref = event ? show(event.slug) : index();

    return (
        <Form {...formRoute} className="space-y-6">
            {({processing, errors}) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">{t('Name')}</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={event?.name ?? ''}
                            required
                            maxLength={100}
                            aria-invalid={!!errors.name}
                        />
                        <InputError message={errors.name}/>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="type">{t('Type')}</Label>
                        <select
                            id="type"
                            name="type"
                            defaultValue={event?.type ?? 'game_night'}
                            aria-invalid={!!errors.type}
                            className="h-9 w-full rounded-md border border-input bg-background px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm"
                        >
                            {types.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.type}/>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">{t('Description')}</Label>
                        <Textarea
                            id="description"
                            name="description"
                            rows={5}
                            defaultValue={event?.description ?? ''}
                            required
                            maxLength={5000}
                            aria-invalid={!!errors.description}
                        />
                        <InputError message={errors.description}/>
                    </div>

                    {/*<div className="grid gap-6 sm:grid-cols-2">*/}
                    <div className="grid items-start gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="starts_at">{t('Starts at')}</Label>
                            <Input
                                id="starts_at"
                                name="starts_at"
                                type="datetime-local"
                                defaultValue={event?.starts_at.slice(0, 16) ?? ''}
                                required
                                aria-invalid={!!errors.starts_at}
                            />
                            <InputError message={errors.starts_at}/>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="ends_at">{t('End date')}</Label>
                            <Input
                                id="ends_at"
                                name="ends_at"
                                type="date"
                                defaultValue={event?.ends_at?.slice(0, 10) ?? ''}
                                aria-invalid={!!errors.ends_at}
                            />
                            <p className="text-xs italic text-muted-foreground">
                                {t('Optional. Only for events that last several days.')}
                            </p>
                            <InputError message={errors.ends_at}/>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            {event ? t('Save') : t('Create event')}
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href={cancelHref}>{t('Cancel')}</Link>
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
