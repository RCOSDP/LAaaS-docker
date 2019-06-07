<?php

namespace udzuki\translator\moodle\db\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 * @package udzuki\translator\moodle\db\Models
 * @property int $id,
 * @property string $firstname
 * @property  string $lastname
 */
class User extends Model
{
    protected $table = 'user';

    public function getIdAttribute($value): string
    {
        return "{$this->getConnection()->getConfig('app_url')}/user/{$value}";
    }

    public function getUsernameAttribute($value): string
    {
        return $value;
    }

    public function getFirstnameAttribute($value): string
    {
        return $value;
    }

    public function getLastnameAttribute($value): string
    {
        return $value;
    }

    public function getInstitusionAttribute($value): string
    {
        return $value;
    }

    public function getDepartmentAttribute($value): string
    {
        return $value;
    }

    public function getDescriptionAttribute($value): string
    {
        return $value;
    }
}