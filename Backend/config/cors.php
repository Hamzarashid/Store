<?php

return [
    'paths' => ['api/*', 'csrf-token'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [env('FRONTEND_URL'), env('APP_URL')],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];