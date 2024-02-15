<?php

namespace App\Translator;

class BaseEvent
{
    /**
     * @var $app_id LMS homepage
     * @var $app_name LMS name
     * @var $app_description LMS description
     * @var $user_description User description
     */
    protected $app_id;
    protected $app_name;
    protected $app_description;
    protected $user_description;

    public function __construct()
    {
        $this->app_id = getenv('APP_ID');
        $this->app_name = getenv('APP_NAME');
        $this->app_description = getenv('APP_DESCRIPTION');
        $this->user_description = "";
    }
}
