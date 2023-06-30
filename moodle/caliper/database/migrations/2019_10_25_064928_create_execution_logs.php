<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExecutionLogs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::connection('log')->hasTable('execution_logs')) {
            Schema::connection('log')->create('execution_logs', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('last_id');
                $table->integer('translated');
                $table->integer('failed');
                $table->date('date');
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
        Schema::dropIfExists('execution_logs');
    }
}
