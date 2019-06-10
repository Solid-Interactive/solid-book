# Infusionsoft

tags: infusionsoft, crm

## API overview
* Create a developer application at: https://keys.developer.infusionsoft.com/.
* The developer application will have a client id and secret.
* Normally this id and secret would be used to authenticate requests to the api, but with the Infusionsoft api, the id and secret merely identifies the application--api requests are authenticated with an access token obtained initially via an OAuth flow using an infusionsoft account.
* The access token expires in 24h, but it includes a refresh token that can be used to obtain a new access token upon expiration. The refresh token lasts 90d.
* Thus, infusionsoft api access involves setting up an OAuth interface to obtain the initial access token, and then managing the token refresh when it expires.
* This setup is eased with the help of infusionsoft's sdks. With php it looks kinda like this:

Path: all
```php
require_once 'vendor/autoload.php';

$infusionsoft = new \Infusionsoft\Infusionsoft(array(
	'clientId'     => 'XXXXXXXXXXXXXXXXXXXXXXXX',
    'clientSecret' => 'XXXXXXXXXX',
    // Set to where to plan to handle the oauth callback in your app.
	'redirectUri'  => 'http://example.com/oauth-callback',
));
//
echo '<a href="' . $infusionsoft->getAuthorizationUrl() . '">Click here to authorize</a>';
```
Path: `/oauth-callback` (Just an example to match redirectUri above.)
```php
if (isset($_GET['code']) {
    // Oauth flow will return with code, which we turn in for an access code.
    $token = $infusionsoft->requestAccessToken($_GET['code']);

    // Save the token to storage (whatever that may be) for api requests.
	save_token_to_storage(serialize($token));
}
```
Path: `/infusionsoft-contacts` (Just an example page that lists contacts from infusionsoft.)
```php
// Get token from storage (whatever that may be).
$token = unserialize(get_token_from_storage());

// If we don't have a token, we need an infusionsoft account to authorize via oauth to obtain one.
if (!$token) {
    return;
}

$infusionsoft->setToken($token);

// Check if token is expired, and refresh it if needed.
if ($infusionsoft->isTokenExpired()) {
    $token = $infusionsoft->refreshAccessToken();

    // Save new token to storage.
	save_token_to_storage(serialize($token));
}

// We now have a non-expired token to make infusionsoft requests with.
echo $infusionsoft->contacts()->all();
```

## Sdks
* php: https://github.com/infusionsoft/infusionsoft-php
