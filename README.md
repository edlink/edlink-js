# edlink-js
This Edlink JavaScript & TypeScript SDK is a NodeJS wrapper for the Edlink API.

| API | v1 | v2 |
|----|----|----|
| Graph | ✅ | ✅ |
| User | ✅ | ❌ |
| Meta | ✅ | ❌ |

Support for the Edlink User API v2 and Meta API v2 will be added when they are introduced. They are currently slated for Fall 2021.

## Quickstart Guide

```js
// Check your connection with Edlink's API.
const up = await Edlink.up();
```

### Meta API
```js
const { Edlink } = require('edlink-js');

// Use your application secret key to access the v1 Meta API.
const meta = Edlink.v1.meta('<application secret key>');

// Loop through all integrations.
for await (const integration of meta.integrations.list()) {
    // Get the integration access token. You can use this to make Graph API calls.
    const access_token = integration.access_token;
}
```

### Graph API
```js
const { Edlink } = require('edlink-js');

// Use your integration access token to access the v1 or v2 Graph API.
const graph = Edlink.v2.graph('<integration access token>');

// Fetch a single object.
const person = await graph.people.fetch('<person id>');

// Loop through all objects.
for await (const person of graph.people.list()) {
    // Do something with each person.
    console.log(person.display_name);
}

// Loop through all objects with a filter applied.
const filter = Filter.where('first_name', 'equals', 'Chris')
    .and('last_name', 'is known');
for await (const person of graph.people.list(filter)) {
    // Do something with each person. (You'll only get ones that match the filter.)
    console.log(person.last_name);
}

// Listing everything in an integration can take a while, so we don't recommend doing it
// more often than you need to. Review our guides on Class Rostering and Events for more info:
// https://ed.link/docs/guides/v2.0/class-rostering
// https://ed.link/docs/guides/v2.0/events
```

### User API
```js
const { Edlink, Auth } = require('edlink-js');

// Create an auth session. This will automatically refresh the access token
// whenever it expires, so you won't have to worry about doing it yourself.
const identity = await Auth.from({
    access_token: '<access token>',
    refresh_token: '<refresh token>',
    expires: new Date('2021-09-07T16:39:15Z')
}, '<client id>', '<client secret>');

// You can also create an auth session directly from an SSO authorization code.
// This is a shortcut for "Exchange the Code for Access and Refresh Tokens" in the
// following guide: https://ed.link/docs/guides/v1.0/authentication
const identity = await Auth.fromCode(
    '<redirect uri>', // the redirect uri that you used to retrieve the code 
    '<authorization code>', // the `code` you received as a url parameter 
    '<client id>', '<client secret>');

// Access the v1 User API using that identity.
const user = Edlink.v1.user(identity);

// Make calls as this user. Looping and fetching follows the same pattern as
// the Graph and Meta APIs, but this API features additional endpoints that
// support creating, updating, and grading for assignments and submissions.
const course = await user.courses.fetch('<course id>');
const successful = await user.courses.gradeSubmission(course.id, '<assignment id>', '<submission id>', 100);

// Once you're done, make sure to persist the user's access token, refresh token
// and expiration date to your own database-- they might have changed during this process.
const { access_token, refresh_token, expires } = identity;
```
