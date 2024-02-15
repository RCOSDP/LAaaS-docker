<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $username
 * @property string $hash
 * @property string $scope
 * @property string $acl
 */
final class Eppn extends Model
{
    public const CREATED_AT = null;
    public const UPDATED_AT = null;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'eppn';

    /**
     * The primary key of the table
     *
     * @var string
     */
    protected $primaryKey = 'username';

    /**
     * Database connection settings
     *
     * @var string
     */
    protected $connection = 'eppn';

    /**
     * @var array
     */
    protected $fillable = [
        'username',
        'hash',
        'scope',
        'acl'
    ];
}
