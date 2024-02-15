<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFailedLogs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection('log')->hasTable('failed_logs')) {
            Schema::connection('log')->create('failed_logs', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('execution_id');
                $table->foreign('execution_id')->references('id')->on('execution_logs');
                $table->char('model', 32);
                $table->integer('model_id');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('failed_logs');
    }
}
