<?php

namespace App\Profiles;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;
use ReflectionClass;

final class BrokenData
{
    private $missingModel;
    private $missingId;
    public function __construct(ModelNotFoundException $broken)
    {
        $this->missingModel = $broken->getModel();
        $this->missingId = $broken->getIds();
    }

    public function getMissingModel()
    {
        $modelName = (new ReflectionClass($this->missingModel))->getShortName();
        return Str::snake($modelName);
    }

    public function getMissingId(): string
    {
        if ($this->missingId == []){
            return 'null';
        } else {
            return $this->missingId[0];
        }
    }
}
