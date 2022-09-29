<?php

namespace App\Caliper\Traits;

use App\Models\Eppn;
use App\Models\Moodle\{
    AssignfeedbackComment,
    Course,
    CourseCategory,
    Event,
    User,
};
use Illuminate\Support\Facades\{
    Config,
    Schema,
};
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

    public function getAnonymizedUsername(User $actor): string
    {
        $eppnValue = env('DB_EPPN');
        if (is_bool($eppnValue) && $eppnValue) {
            $enableEppn = true;
        } elseif (is_string($eppnValue) && $eppnValue == 'true') {
            $enableEppn = true;
        } else {
            $enableEppn = false;
        }
        if ($enableEppn) {
            $username = ($actor->auth === 'lti')
                ? $actor->alternatename
                : $actor->username;
            $hash = $username ? hash('sha256', $username) : '';
            $eppn = Eppn::where('username', $username)->first();
            if (is_null($eppn)) {
                if (strpos($username, '@')) {
                    $scope = explode('@', $username)[1];
                    $tenants = Config::get('lrw.tenants');
                    if (array_key_exists($scope, $tenants)) {
                        Eppn::create([
                            'username' => $username,
                            'hash' => $hash,
                            'scope' => $scope,
                            'acl' => str_replace(['.', '-'], '_', $scope),
                        ]);
                    }
                }
                return $hash;
            } else {
                return $eppn->hash;
            }
        } else {
            return hash('sha256', $actor->username);
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

    protected function getScoLaunchedEvent(int $sco): Event
    {
        return Event::column()
                ->where([
                    ['eventname', '\mod_scorm\event\sco_launched'],
                    ['objectid', $sco]
                ])
                ->latest('timecreated')
                ->first();
    }

    public function getEdApp()
    {
        $edApp = new \stdClass();
        $edApp->id = env('APP_URL');
        $edApp->name = env('APP_NAME');
        return $edApp;
    }

    public function getUserId(string $id): string
    {
        return env('APP_URL') . '/user/profile.php?id=' . $id;
    }

    public function getCourseId(string $id): string
    {
        return env('APP_URL') . '/course/view.php?id=' . $id;
    }
}
