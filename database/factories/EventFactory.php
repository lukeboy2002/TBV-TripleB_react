<?php

namespace Database\Factories;

use App\Enums\EventType;
use App\Models\Event;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'type' => EventType::GameNight,
            'starts_at' => fake()->dateTimeBetween('+1 day', '+3 months'),
            'ends_at' => null,
            'icon' => null,
        ];
    }

    /**
     * A multi-day: Event::factory()->multiDay()->create()
     */
    public function multiDay(): static
    {
        return $this->state(function (array $attributes) {
            $start = CarbonImmutable::instance($attributes['starts_at']);

            return [
                'type' => EventType::Outing,
                'ends_at' => $start->addDays(2),
            ];
        });
    }

    /**
     * An event that has already taken place.
     */
    public function past(): static
    {
        return $this->state(fn () => [
            'starts_at' => fake()->dateTimeBetween('-3 months', '-1 day'),
        ]);
    }
}
