<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('verses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('surah_id')->constrained()->onDelete('cascade');
            $table->integer('number');
            $table->integer('number_in_surah');
            $table->integer('juz');
            $table->integer('manzil');
            $table->integer('ruku');
            $table->integer('hizb_quarter');
            $table->boolean('sajda')->default(false);
            $table->text('text');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verses');
    }
};
