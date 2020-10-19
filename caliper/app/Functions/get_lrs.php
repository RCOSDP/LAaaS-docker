<?php
namespace App\Functions;

use Illuminate\Support\Facades\Config;

if (!function_exists('get_lrs')) {
    /**
     * get lrs by ePPN scopes as string.
     *
     * username := username@scopes
     *
     * @param object $event enveloped event.
     * @return string $lrs api key of tenants api key
     */
    function get_lrs(string $username)
    {
        $tenants = Config::get('lrw.tenants');
        $scope = 'default';
        if (strpos($username, '@')) {
            $eppn = explode('@', $username)[1];
            if(array_key_exists($eppn, $tenants)){
                $scope = $eppn;
            }
        }

        return $tenants[$scope];
    }
}
