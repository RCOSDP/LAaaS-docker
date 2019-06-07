<?php

namespace udzuki\translator\moodle\classes\mod\assign;

use udzuki\translator\moodle\db\Models\Events;
use udzuki\translator\moodle\db\traits\Assign;
use udzuki\translator\moodle\db\traits\Attempt;
use udzuki\translator\moodle\EventFactory;
use udzuki\translator\TranslatedEvent;

class AssignmentGraded extends EventFactory
{
    function __construct()
    {
        $this->recipe = 'assignment_graded';
    }

    use Assign;
    use Attempt;

    function setObject(Events $event): void
    {
        $assign_grade = $this->readAssignGrade($event->id);
        $assign = $this->readAssign($assign_grade->id);
        $assignee = $this->readUser($assign_grade->userid);
        if ($assign->maxattempts === -1) {
            $assign_grade->attemptnumber += 1;
        }

        global $db;
        $this->object = (object)[
            'id' => "{$db->getConnection()->getConfig('host')}/user/{$assign_grade->id}/attempt/{$assign_grade->attemptnumber}",
            'name' => $assign->intro,
            'attempt' => $assign_grade->attemptnumber,
            'start' => $assign->allowsubmissionsfromdate,
            'due' => $assign->duedate,
            'assignee_id' => $assignee->id,
            'assignee_name' => $assignee->username,
            'assignee_description' => $assignee->description,
            'given_score' => $assign_grade->grade,
            'max_attempt' => $assign->maxattempt,
            'max_score' => $assign->grade,
            'comment' => ($this->readGradeComment($assign->id, $assign_grade->id))->commenttext,

        ];
    }

    function process(): TranslatedEvent
    {
        return (new TranslatedEvent())
            ->setRecipe($this->recipe)
            ->setApp($this->app)
            ->setEventTime($this->time)
            ->setActor([
                "id" => $this->actor->id,
                "name" => $this->actor->username,
                "description" => $this->actor->attempt
            ])
            ->setObject([
                "id" => $this->object->id,
                "name" => $this->object->name,
                "attempt" => $this->object->description,
                'start' => $this->object->start,
                'due' => $this->object->due,
                'assignee' => [
                    'id' => $this->object->assignee_id,
                    'name' => $this->object->assignee_name,
                    'description' => $this->object->assignee_description
                ]
            ])
            ->setGenerated([
                'id' => "{$this->object->id}/result",
                'max_score' => $this->object->max_score,
                'given_score' => $this->object->given_score,
                'comment' => $this->object->comment,
            ]);
    }
}