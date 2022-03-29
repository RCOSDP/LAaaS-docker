<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class ScormScoesTrackFailedLog extends Model
{
    /**
     * @property integer $id
     * @property integer $execution_id
     * @property string $model
     * @property string $model_id
     */
    public const CREATED_AT = null;
    public const UPDATED_AT = null;

    protected $connection = 'log';
    protected $prefix = null;

    protected $fillable = [
        'id',
        'execution_id',
        'model',
        'model_id'
    ];
}
