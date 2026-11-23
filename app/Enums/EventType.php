<?php

namespace App\Enums;

enum EventType: string
{
    case GameNight = 'game_night';
    case Outing = 'outing';
    case Other = 'other';

    /**
     * English name; the translation can be found in lang/nl.json.
     */
    public function label(): string
    {
        return match ($this) {
            self::GameNight => __('Game night'),
            self::Outing => __('Outing'),
            self::Other => __('Other'),
        };
    }
}
