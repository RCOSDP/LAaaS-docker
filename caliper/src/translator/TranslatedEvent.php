<?php

namespace udzuki\translator;

final class TranslatedEvent
{
    public $actor;
    public $object;
    public $action;
    public $generated;
    public $recipe;
    public $event_time;
    public $app;

    public function setActor(array $actor): self
    {
        $this->actor = $actor;
        return $this;
    }

    public function setObject(array $object): self
    {
        $this->object = $object;
        return $this;
    }

    public function setGenerated(array $generated = null): self
    {
        $this->generated = $generated;
        return $this;
    }

    public function setRecipe(string $recipe): self
    {
        $this->recipe = $recipe;
        return $this;
    }

    public function setEventTime(\DateTime $event_time): self
    {
        $this->event_time = $event_time;
        return $this;
    }

    public function setApp(string $app): self
    {
        $this->app = $app;
        return $this;
    }
}