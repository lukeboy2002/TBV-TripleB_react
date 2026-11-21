<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

/**
 * Zet alle bekende spelers in de database.
 *
 * De namen en e-mailadressen staan NIET in deze code, maar in
 * database/seeders/data/players.json. Dat bestand staat in .gitignore
 * en komt dus nooit op GitHub. Een voorbeeld van de opbouw staat in
 * database/seeders/data/players.example.json.
 *
 * Je kunt deze seeder vaker draaien: bestaande spelers (zelfde e-mailadres)
 * worden bijgewerkt in plaats van dubbel aangemaakt.
 *
 *   php artisan db:seed --class=PlayerSeeder
 */
class PlayerSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('seeders/data/players.json');

        if (! File::exists($path)) {
            $this->command?->warn('Geen players.json gevonden, er zijn geen spelers aangemaakt.');

            return;
        }

        /** @var array<int, array{name: string, username: string, email: string, is_admin?: bool, password?: string}> $players */
        $players = json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);

        foreach ($players as $player) {
            // Zoek de speler op e-mailadres, of maak een nieuwe (nog niet opgeslagen) aan.
            $user = User::firstOrNew(['email' => Str::lower($player['email'])]);

            $user->name = $player['name'];
            // Gebruikersnamen altijd in kleine letters, zodat "Antoine" en "antoine" hetzelfde zijn.
            $user->username = Str::lower($player['username']);
            $user->is_admin = $player['is_admin'] ?? false;

            // Alleen een wachtwoord zetten bij een nieuwe speler, of als er een in het bestand staat.
            // Zonder wachtwoord krijgt de speler een lang willekeurig wachtwoord; die kiest later
            // zelf een wachtwoord via de uitnodiging of "Wachtwoord vergeten".
            if (! $user->exists || isset($player['password'])) {
                $user->password = $player['password'] ?? Str::password(32);
            }

            // De spelers zijn bekend, dus hun e-mailadres geldt als bevestigd.
            $user->email_verified_at ??= now();

            $user->save();
        }

        $this->command?->info(count($players).' spelers verwerkt.');
    }
}
