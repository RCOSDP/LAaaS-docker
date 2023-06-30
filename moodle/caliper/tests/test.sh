#!/bin/bash

# Pre-processing
sh tests/setup.sh

# Running tests
composer test

# Post-processing
sh tests/teardown.sh
