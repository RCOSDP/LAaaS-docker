<?php

namespace udzuki\Profiles\Session;

use IMSGlobal\Caliper\{actions\Action, entities\agent, events\SessionEvent};
use udzuki\translator\TranslatedEvent;

class UserLoggedOut extends SessionEvent
{
    public function __construct(TranslatedEvent $translatedEvent)
    {
        parent::__construct();
        $edApp =
            (new agent\SoftwareApplication($translatedEvent->app));
        $this
            ->setEventTime($translatedEvent->event_time)
            ->setEdApp($edApp)
            ->setActor(
                (new agent\Person($translatedEvent->actor['id']))
                    ->setName($translatedEvent->actor['name'])
                    ->setDescription($translatedEvent->actor['description'])
            )
            ->setAction(new Action(Action::LOGGED_OUT))
            ->setObject($edApp);
    }
}

