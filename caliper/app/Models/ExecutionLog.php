<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class ExecutionLog extends Model
{
    /**
     * @property integer $id
     * @property integer $last_id
     * @property integer $translated
     * @property integer $failed
     * @property string $date
     */
    public const CREATED_AT = 'date';
    public const UPDATED_AT = null;

    protected $connection = 'log';
    protected $dateFormat = 'c';
    protected $prefix = null;

    protected $fillable = [
        'id',
        'last_id',
        'translated',
        'failed',
        'date'
    ];
}
