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
        $this->app_id = "moodle";
        $this->app_name = "moodle";
        $this->app_description = "Moodle is a open source learning platform designed to provide educators, administrators and learners with a single robust, secure and integrated system to create personalized learning environments.";
        $this->user_description = "";
    }
}
