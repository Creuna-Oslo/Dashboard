# Dashboard

App for visualizing GitHub, Travis and npm status

# Firebase config

## Database rules

Database access is set in `database-rules.json`. Read access is disabled by default and enabled for specific fields.

If you're not receiving any data for a field you should check if that field has read access set to `true`.

A global `".read": true` should not be set (unless you want weekly emails from Google reminding you of your insecure database rules).

## Firebase init

Firebase init stuff goes in `firebase-init.json`. It's a good idea to set strict restrictions on the API key in the [Google Cloud Platform console](https://console.cloud.google.com/apis/credentials).
