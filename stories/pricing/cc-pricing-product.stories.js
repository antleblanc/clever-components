import '../../src/pricing/cc-pricing-product.js';
import { makeStory, storyWait } from '../lib/make-story.js';
import { enhanceStoriesNames } from '../lib/story-names.js';
import * as psql from './psql.json';
import * as redisData from './redis.json';

export default {
  title: '$ pricing/<cc-pricing-product>',
  component: 'cc-pricing-product',
};

const SHORT_DESC = 'Hey, this is a short description of the addon.';

const conf = {
  component: 'cc-pricing-product',
  // language=CSS
  css: `cc-pricing-product {
    margin-bottom: 1rem;
  }`,
};

const baseItems = {
  postgres: {
    title: 'Postgresql',
    icon: 'https://static-assets.cellar.services.clever-cloud.com/logos/pgsql.svg',
    description: SHORT_DESC,
    items: psql.plans,
    features: psql.features,
  },
  redis: {
    title: 'Redis',
    icon: 'https://static-assets.cellar.services.clever-cloud.com/logos/redis.svg',
    description: SHORT_DESC,
    items: redisData.plans,
    features: redisData.features,
  },
};

export const defaultStory = makeStory(conf, {
  items: [
    baseItems.postgres,
    baseItems.redis,
  ],
});

export const postgres = makeStory(conf, {
  items: [baseItems.postgres],
});

export const redis = makeStory(conf, {
  items: [baseItems.redis],
});

// If your component contains remote data,
// you'll need a "skeleton screen" while the user's waiting for the data.
export const skeleton = makeStory(conf, {
  items: [{}],
});

// If your component contains remote data,
// don't forget the case where there is no data (ex: empty lists...).
export const empty = makeStory(conf, {
  items: [{ three: [] }],
});

// If your component contains remote data,
// don't forget the case where you have loading errors.
// If you have other kind of errors (ex: saving errors...).
// You need to name your stories with the `errorWith` prefix.
export const error = makeStory(conf, {
  items: [{ error: true }],
});

// If your component contains remote data,
// try to present all the possible data combination.
// You need to name your stories with the `dataLoadedWith` prefix.
// Don't forget edge cases (ex: small/huge strings, small/huge lists...).
export const dataLoadedWithFoo = makeStory(conf, {
  items: [
    { one: 'Foo', three: [{ foo: 42 }] },
  ],
});

// If your component can trigger updates/deletes remote data,
// don't forget the case where the user's waiting for an operation to complete.
export const waiting = makeStory(conf, {
  items: [
    { one: 'Foo', three: [{ foo: 42 }], waiting: true },
  ],
});

// If your component contains remote data,
// it will have several state transitions (ex: loading => error, loading => loaded, loaded => saving...).
// When transitioning from one state to another, we try to prevent the display from "jumping" or "blinking" too much.
// Using "simulations", you can simulate several steps in time to present how your component behaves when it goes through different states.
export const simulations = makeStory(conf, {
  items: [{}, {}],
  simulations: [
    storyWait(2000, ([component, componentError]) => {
      component.three = [{ foo: 42 }];
      componentError.error = true;
    }),
    storyWait(1000, ([component]) => {
      component.three = [{ foo: 42 }, { foo: 43 }];
    }),
  ],
});

enhanceStoriesNames({
  defaultStory,
  postgres,
  skeleton,
  empty,
  error,
  dataLoadedWithFoo,
  waiting,
  simulations,
});
