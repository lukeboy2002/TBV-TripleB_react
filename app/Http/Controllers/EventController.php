<?php

namespace App\Http\Controllers;

use App\Enums\EventType;
use App\Http\Requests\EventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Event::class);

        $upcoming = Event::query()
            ->upcoming()
            ->with('user')
            ->orderBy('starts_at')
            ->get();

        $past = Event::query()
            ->where('starts_at', '<', now()->startOfDay())
            ->where(fn ($q) => $q->whereNull('ends_at')->orWhere('ends_at', '<', now()->startOfDay()))
            ->with('user')
            ->orderByDesc('starts_at')
            ->limit(10)
            ->get();

        return Inertia::render('agenda/index', [
            'upcoming' => EventResource::collection($upcoming),
            'past' => EventResource::collection($past),
            'canCreate' => Gate::allows('create', Event::class),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventRequest $request): RedirectResponse
    {
        Gate::authorize('create', Event::class);

        // Via de relatie aanmaken: dan wordt user_id automatisch de ingelogde speler.
        $event = $request->user()->events()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Event created.')]);

        return to_route('agenda.show', $event);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Event::class);

        return Inertia::render('agenda/create', [
            'types' => $this->typeOptions(),
        ]);
    }

    /**
     * The types for the selection menu in the form: [['value' => 'game_night', 'label' => 'Speelavond'], ...]
     *
     * @return list<array{value: string, label: string}>
     */
    private function typeOptions(): array
    {
        return array_map(
            fn (EventType $type) => ['value' => $type->value, 'label' => $type->label()],
            EventType::cases(),
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event): Response
    {
        Gate::authorize('view', $event);

        return Inertia::render('agenda/show', [
            'event' => EventResource::make($event->load('user')),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event): Response
    {
        Gate::authorize('update', $event);

        return Inertia::render('agenda/edit', [
            'event' => EventResource::make($event),
            'types' => $this->typeOptions(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventRequest $request, Event $event): RedirectResponse
    {
        Gate::authorize('update', $event);

        $event->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Event updated.')]);

        return to_route('agenda.show', $event);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event): RedirectResponse
    {
        Gate::authorize('delete', $event);

        $event->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Event deleted.')]);

        return to_route('agenda.index');
    }
}
