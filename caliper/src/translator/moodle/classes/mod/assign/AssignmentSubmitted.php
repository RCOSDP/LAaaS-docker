<?php

namespace udzuki\translator\moodle\classes\mod\assign;

use udzuki\translator\moodle\db\Models\Events;
use udzuki\translator\moodle\db\traits\Assign;
use udzuki\translator\moodle\EventFactory;
use udzuki\translator\TranslatedEvent;

class AssignmentSubmitted extends EventFactory
{
    private $assignee;

    function __construct()
    {
        $this->recipe = 'assign_submitted';
    }

    use Assign;

    function setObject(Events $event): void
    {
        $submission = $this->readAssignSubmission($event->id);
        $assign = $this->readAssign($submission->assignment);
        if ($assign->maxattempts === -1) {
            $submission->attemptnumber += 1;
        }
        $this->object = $assign;
        $this->assignee = $this->readUser($submission->userid);
    }

    function process(): TranslatedEvent
    {
        return (new TranslatedEvent())
            ->setRecipe($this->recipe)
            ->setApp($this->app->id)
            ->setEventTime($this->time)
            ->setActor([
                'id' => $this->actor->id,
                'name' => $this->actor->username,
                'description' => $this->actor->description
            ])
            ->setObject([
                'id' => $this->object->id,
                'name' => $this->object->name,
                'start' => (new \DateTime())->setTimestamp($this->object->allowsubmissionsfromdate),
                'due' => (new \DateTime())->setTimestamp($this->object->duedate),
            ])
            ->setGenerated([
                'id' => "{$this->object->id}/attempt/{$this->object->attemptnumber}",
                'count' => $this->object->attemptnumber,
                'assignee' => [
                    'id' => $this->assignee->id,
                    'name' => $this->assignee->username,
                    'description' => $this->assignee->description
                ]
            ]);
    }
}