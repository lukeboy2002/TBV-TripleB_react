<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('agenda', 'agenda/index')->name('agenda.index');
    Route::inertia('ranking', 'ranking/index')->name('ranking.index');
    Route::inertia('players', 'players/index')->name('players.index');
    Route::inertia('scores/create', 'scores/create')->name('scores.create');
});

require __DIR__ . '/settings.php';
