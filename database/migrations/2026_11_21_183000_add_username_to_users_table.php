<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Voeg een gebruikersnaam toe, waarmee spelers ook kunnen inloggen.
     *
     * unique(): twee spelers kunnen nooit dezelfde gebruikersnaam hebben.
     * nullable(): zo werkt de migration ook als er al spelers in de tabel staan.
     * De PlayerSeeder vult de gebruikersnaam voor iedereen in.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->unique()->after('name');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['username']);
            $table->dropColumn('username');
        });
    }
};
