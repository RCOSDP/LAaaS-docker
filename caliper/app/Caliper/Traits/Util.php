<?php

namespace App\Caliper\Traits;

use App\Models\Moodle\AssignfeedbackComment;
use App\Models\Moodle\Course;
use App\Models\Moodle\CourseCategory;
use App\Models\Moodle\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

trait Util
{
    protected function getUser(string $id): ?User
    {
        if (Schema::hasTable('user')) {
            return User::column()->findOrFail($id);
        } else {
            $user = new User();
            $user->id = $id;
            $user->username = $id;
            $user->description = $id;
            return $user;
        }
    }

    protected function getCourse(int $id): ?Course
    {
        return Course::column()->findOrFail($id);
    }

    protected function getCourseCategory(string $id): string
    {
        if (strcmp($id, 'null') == 0) {
            $category = 'null';
        } else {
            $category = CourseCategory::column()->find($id)->name ?? 'Top Site';
        }
        return $category;
    }

    protected function getModule(string $type, int $id)
    {
        $type = 'App\Models\Moodle\\' . Str::studly($type);
        return $type::column()->findOrFail($id);
    }

    protected function getGradeComment(int $assign, int $grade): AssignfeedbackComment
    {
        return AssignfeedbackComment::column()
                ->where([['assignment', $assign], ['grade', $grade]])
                ->firstOrFail();
    }
    
    public function getEdApp(): string
    {
        return env('APP_NAME');
    }
}
