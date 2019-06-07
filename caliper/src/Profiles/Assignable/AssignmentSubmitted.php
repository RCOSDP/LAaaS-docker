<?php

namespace udzuki\Profiles\Assignable;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\Person;
use IMSGlobal\Caliper\entities\agent\SoftwareApplication;
use IMSGlobal\Caliper\entities\assessment\Assessment;
use IMSGlobal\Caliper\entities\assessment\AssessmentItem;
use IMSGlobal\Caliper\entities\assignable\Attempt;
use IMSGlobal\Caliper\events\AssessmentEvent;
use udzuki\translator\TranslatedEvent;

class AssignmentSubmitted extends AssessmentEvent
{
    public function __construct(TranslatedEvent $translatedEvent)
    {
        parent::__construct();
        $items = [];
        foreach ($translatedEvent->object['items'] as $question) {
            $items[] = (new AssessmentItem($question->id))
                ->setName($question->name)
                ->setDescription($question->questiontext);
        }
        $this
            ->setEdApp((new SoftwareApplication($translatedEvent->app)))
            ->setEventTime($translatedEvent->event_time)
            ->setActor(
                (new Person($translatedEvent->actor['id']))
                    ->setName($translatedEvent->actor['name'])
                    ->setDescription($translatedEvent->actor['description'])
            )
            ->setAction(new Action(Action::SUBMITTED))
            ->setObject(
                (new Assessment($translatedEvent->object['id']))
                    ->setName($translatedEvent->object['name'])
                    ->setDescription($translatedEvent->object['description'])
                    ->setItems($items)
            )
            ->setGenerated(
                (new Attempt($translatedEvent->generated['id']))
                    ->setAssignee(
                        (new Person($translatedEvent->generated['assignee']['id']))
                            ->setName($translatedEvent->generated['assignee']['name'])
                            ->setDescription($translatedEvent->generated['assignee']['description'])
                    )
                    ->setCount($translatedEvent->generated['count'])
            );
    }
}