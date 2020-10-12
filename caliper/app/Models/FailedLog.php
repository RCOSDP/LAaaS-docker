<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class FailedLog extends Model
{
    /**
     * @property integer $id
     * @property integer $execution_id
     * @property string $model
     * @property string $model_id
     */
    const CREATED_AT = null;
    const UPDATED_AT = null;
    
    protected $connection = 'log';
    protected $prefix = null;

    protected $fillable = [
        'id',
        'execution_id',
        'model',
        'model_id'
    ];
}
