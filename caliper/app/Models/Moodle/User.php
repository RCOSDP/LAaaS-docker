<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property string $id
 * @property string $auth
 * @property integer $confirmed
 * @property integer $policyagreed
 * @property integer $deleted
 * @property integer $suspended
 * @property integer $mnethostid
 * @property string $username
 * @property string $password
 * @property string $idnumber
 * @property string $firstname
 * @property string $lastname
 * @property string $email
 * @property integer $emailstop
 * @property string $icq
 * @property string $skype
 * @property string $yahoo
 * @property string $aim
 * @property string $msn
 * @property string $phone1
 * @property string $phone2
 * @property string $institution
 * @property string $department
 * @property string $address
 * @property string $city
 * @property string $country
 * @property string $lang
 * @property string $calendartype
 * @property string $theme
 * @property string $timezone
 * @property integer $firstaccess
 * @property integer $lastaccess
 * @property integer $lastlogin
 * @property integer $currentlogin
 * @property string $lastip
 * @property string $secret
 * @property integer $picture
 * @property string $url
 * @property string $description
 * @property integer $descriptionformat
 * @property integer $mailformat
 * @property integer $maildigest
 * @property integer $maildisplay
 * @property integer $autosubscribe
 * @property integer $trackforums
 * @property integer $timecreated
 * @property integer $timemodified
 * @property integer $trustbitmask
 * @property string $imagealt
 * @property string $lastnamephonetic
 * @property string $firstnamephonetic
 * @property string $middlename
 * @property string $alternatename
 */
class User extends MoodleBase
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'user';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'string';

    /**
     * @var array
     */
    protected $fillable = [
        'auth',
        'confirmed',
        'policyagreed',
        'deleted',
        'suspended',
        'mnethostid',
        'username',
        'password',
        'idnumber',
        'firstname',
        'lastname',
        'email',
        'emailstop',
        'icq',
        'skype',
        'yahoo',
        'aim',
        'msn',
        'phone1',
        'phone2',
        'institution',
        'department',
        'address',
        'city',
        'country',
        'lang',
        'calendartype',
        'theme',
        'timezone',
        'firstaccess',
        'lastaccess',
        'lastlogin',
        'currentlogin',
        'lastip',
        'secret',
        'picture',
        'url',
        'description',
        'descriptionformat',
        'mailformat',
        'maildigest',
        'maildisplay',
        'autosubscribe',
        'trackforums',
        'timecreated',
        'timemodified',
        'trustbitmask',
        'imagealt',
        'lastnamephonetic',
        'firstnamephonetic',
        'middlename',
        'alternatename'
    ];

    /**
     * Scope a query to only include required column.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeColumn($query)
    {
        return $query->select([
            'id',
            'username',
            'description'
        ]);
    }
}
