<?php

require __DIR__ . '/vendor/autoload.php';
use Minishlink\WebPush\WebPush;

$auth = array(
    'VAPID' => array(
        'subject' => 'https://github.com/Minishlink/web-push-php-example/',
        'publicKey' => 'BCmti7ScwxxVAlB7WAyxoOXtV7J8vVCXwEDIFXjKvD-ma-yJx_eHJLdADyyzzTKRGb395bSAtxlh4wuDycO3Ih4',
        'privateKey' => 'HJweeF64L35gw5YLECa-K7hwp3LLfcKtpdRNK8C_fPQ', // in the real world, this would be in a secret file
    ),
);

$webPush = new WebPush($auth);
$res = $webPush->sendNotification(
    $subscription['endpoint'],
    "Hello!", // payload
    $subscription['key'],
    $subscription['token'],
    true // flush
);

?>