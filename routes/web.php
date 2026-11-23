<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('agenda', EventController::class)->parameters(['agenda' => 'event']);
    Route::inertia('ranking', 'ranking/index')->name('ranking.index');
    Route::inertia('players', 'players/index')->name('players.index');
    Route::inertia('scores/create', 'scores/create')->name('scores.create');
});

require __DIR__.'/settings.php';
