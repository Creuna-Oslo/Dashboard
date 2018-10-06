# Cloud functions

## Travis webhooks

To add a Travis webhook for a repo, edit the `.travis.yml` for the repo like so:

```
notifications:
  webhooks:
    on_start: always
    urls:
      - secure: "encrypted_cloud_function_url"
```

`on_start: always` ensures that the cloud function is called when a build is started.

### Encrypting cloud function URL

The cloud function URL should be encrypted. To do this, install the [travis cli](https://github.com/travis-ci/travis.rb), `cd` to the root of the repo and run this (replacing the URL with the actual cloud function URL):

```
travis encrypt http://example.com/hook
```

Put the resulting has as the URL in `.travis.yml`

## NPM webhooks

NPM hooks are created using [wombat](https://github.com/npm/wombat-cli#readme). Wombat supports adding a secret that can be used to confirm the validity of incoming requests. This secret is stored as a Firebase environment variable using `firebase-tools` like so:

```
firebase functions:config:set npm.secret="SECRET"
```

After doing this, you'll need to do a manual deploy functions (`firebase deploy --only functions`) to make the environment variable available in the cloud.

When deployed, the environment variables can be accessed in cloud functions like so:

```js
functions.config().npm.secret;
```

More about environment variables [here](https://firebase.google.com/docs/functions/config-env#set_environment_configuration_for_your_project).

## NPM package urls

NPM does not include a URL to a package in webhook payloads, so this is created manually in `./event-handlers/npm.js`
