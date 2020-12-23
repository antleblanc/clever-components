---
kind: '📌 Docs'
---
# How to write stories

We're trying to enforce a few names/titles for our stories.
This is a great way for developers not to forget cases like error, empty, skeleton/loading...
This is also a great way for users to recognize patterns in our components.

## General rules and reminders

* Try to show off your components in all the different possible situations (data-wise) with a set of fake data that ressemble what could happen in production.
* If you handle user inputs, think about cases where the text is very long.
* Think about what happens if it fails (error in general).
* Think about what happens while we're waiting for the data.
* Think about what happens if there are no data.
* Try to show off a time-simulation like "loading" then "data is loaded". 

## Generic names

We want to keep consistency between our stories so we're proposing special names and prefixes:

* If you only have one story, name it `defaultStory`.
* If you have one main story, and a few other cases, name it `defaultStory`.
* ⌛ If you're showing off a component in it's "no data yet" state with a skeleton screen UI pattern, name it `skeleton`.
* ⌛ If you're showing off a component in it's "no data yet" state with a loading indicator, name it `loading`.
* 🕳 If you're showing off a component in it's "data loaded but empty data", start your story name with `empty`.
* 👍 If you're showing off a component with data loaded in different contexts, start your story name with `dataLoaded`.
* 📈 If you're showing off a component with data in a time-simulation like "loading" then "data is loaded", start your story name with `simulation`.
* 🔥 If you're showing off a component with an error, start your story name with `error`.

NOTE: If you need to specify some details about your story, use `with` and it will trigger parens in the displayed title.

Examples:

* `errorWithLoadingIndicator` => 🔥 Error (loading indicator)
* `dataLoadedWithDisabled` => 👍 Data loaded (disabled)
* `simulationWithFoobarAttribute` => 📈 Simulation (foobar attribute)

To enable this behaviour, you need to call `enhanceStoriesNames({ /* stories */ });` from `stories/lib/story-names.js` at the end of your story file.

Example:

```js
import { enhanceStoriesNames } from '../lib/story-names.js';

export const skeleton = () => { /* story code */ };
export const error = () => { /* story code */ };
export const empty = () => { /* story code */ };
export const dataLoaded = () => { /* story code */ };
export const simulations = () => { /* story code */ };

enhanceStoriesNames({ skeleton, error, empty, dataLoaded, simulations });
```

You'll end up with those stories (sorted in alpha order):

* 👍 Data loaded
* 🕳 Empty (no data)
* 🔥 Error
* 📈 Simulations
* ⌛ Skeleton (no data yet)
