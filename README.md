# Dashboard

App for visualizing GitHub, Travis and npm status

# Setup

- Make a Firebase account
- Create a new project in Firebase.
- Follow [this guide](https://firebase.google.com/docs/web/setup) to initialize project for javascript.
- Put the api keys and other required information in `firebase-init-json`
- Consider adding some restrictions to your API key in the [Google Cloud Platform Console](https://console.cloud.google.com/apis/credentials)

# Webhooks setup

See the [cloud functions Readme](functions/README.md).

# Firebase database rules

Database access is set in `database-rules.json`. Read access is disabled by default and enabled for specific fields.

If you're not receiving any data for a field you should check if that field has read access set to `true`.

A global `'.read': true` should not be set (unless you want weekly emails from Google reminding you of your insecure database rules).
