<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Applicants - Email Workflow Configuration
    |--------------------------------------------------------------------------
    |
    | URL Google Form yang dikirim ke applicant via email setelah HR Accept.
    | Set di .env: APPLICANT_BIODATA_FORM_URL=https://forms.gle/your-form-id
    |
    | Logo Umara Group (parent) — ditampilkan di header email bersama logo
    | sub-brand. Pakai URL public yang permanent (bukan file local) agar
    | tetap accessible saat email dibuka di mana saja.
    |
    */
    'applicants' => [
        'biodata_form_url' => env('APPLICANT_BIODATA_FORM_URL', 'https://forms.gle/placeholder'),
        'parent_logo_url'  => env('APPLICANT_PARENT_LOGO_URL', 'https://assets.bridgeflow.my.id/logos/umara-group.png'),
    ],

];
