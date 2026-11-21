<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                // Alleen de velden die de frontend nodig heeft, niet het hele model.
                // ?-> : is er niemand ingelogd, dan wordt dit null.
                'user' => $request->user()?->only([
                    'id', 'name', 'username', 'email', 'is_admin', 'email_verified_at',
                ]),
            ],
            'locale' => app()->getLocale(),
            // De vertalingen voor de React-kant (gebruikt door useTranslation()).
            // Inertia::once() zorgt dat ze maar één keer worden meegestuurd
            // en daarna in de browser bewaard blijven.
            'translations' => Inertia::once(fn () => $this->translations()),
        ];
    }

    /**
     * Lees lang/<taal>.json, bijvoorbeeld lang/nl.json.
     *
     * @return array<string, string>
     */
    protected function translations(): array
    {
        $path = lang_path(app()->getLocale().'.json');

        if (! File::exists($path)) {
            return [];
        }

        return json_decode(File::get($path), true) ?? [];
    }
}
