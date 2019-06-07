<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Quiz
{
    function readQuiz(int $id): Models\Quiz
    {
        return Models\Quiz::find($id);
    }

    function readQuizAttempt(int $id): Models\QuizAttempt
    {
        return Models\QuizAttempt::find($id);
    }
}