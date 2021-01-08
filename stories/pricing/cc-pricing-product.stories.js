import '../../src/pricing/cc-pricing-product.js';
import { makeStory, storyWait } from '../lib/make-story.js';
import { enhanceStoriesNames } from '../lib/story-names.js';

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
    items: [
      {
        id: 'plan_f14478be-b59a-4f64-870c-6887c561492d',
        name: 'XS Small Space',
        price: 17.5,
        features: [
          {
            name: 'Backups',
            code: 'backup',
            typeSlug: 'object',
            value: 'Daily - 7 Retained',
            featureValue: '',
          },
          {
            name: 'Max DB size',
            code: 'max-db-size',
            typeSlug: 'bytes',
            value: '5 GB',
            featureValue: 5368709120,
          },
          {
            name: 'Metrics',
            code: 'metrics',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
          {
            name: 'PostGIS',
            code: 'postgis',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
          {
            name: 'Type',
            code: 'type-shared',
            typeSlug: 'boolean-shared',
            value: 'Dedicated',
            featureValue: false,
          },
          {
            name: 'vCPUS',
            code: 'cpu',
            typeSlug: 'number',
            value: '1',
            featureValue: 1,
          },
          {
            name: 'Logs',
            code: 'logs',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
          {
            name: 'Max connection limit',
            code: 'connection-limit',
            typeSlug: 'number',
            value: '75',
            featureValue: 75,
          },
          {
            name: 'Memory',
            code: 'memory',
            typeSlug: 'bytes',
            value: '1 GB',
            featureValue: 1073741824,
          },
          {
            name: 'Migration Tool',
            code: 'migration',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
        ],
      },
      {
        id: 'plan_c32d00fb-6c06-48a9-a0a3-9d808937ec68',
        name: 'XXS Small Space',
        price: 5.25,
        features: [
          {
            name: 'Backups',
            code: 'backup',
            typeSlug: 'object',
            value: 'Daily - 7 Retained',
            featureValue: '',
          },
          {
            name: 'Logs',
            code: 'logs',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
          {
            name: 'Max DB size',
            code: 'max-db-size',
            typeSlug: 'bytes',
            value: '1 GB',
            featureValue: 1073741824,

          },
          {
            name: 'Migration Tool',
            code: 'migration',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
          {
            name: 'PostGIS',
            code: 'postgis',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,

          },
          {
            name: 'Type',
            code: 'type-shared',
            typeSlug: 'boolean-shared',
            value: 'Dedicated',
            featureValue: false,
          },
          {
            name: 'vCPUS',
            code: 'cpu',
            typeSlug: 'number',
            value: '1',
            featureValue: 1,
          },
          {
            name: 'Max connection limit',
            code: 'connection-limit',
            typeSlug: 'number',
            value: '45',
            featureValue: 45,
          },
          {
            name: 'Metrics',
            code: 'metrics',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
          {
            name: 'Memory',
            code: 'memory',
            typeSlug: 'bytes',
            value: '512 MB',
            featureValue: 536870912,
          },
        ],
      },
      {
        id: 'plan_9b4505e7-ac36-4caa-ac7d-9e11b6a26b15',
        name: 'XL Small Space',
        price: 328,
        features: [
          {
            name: 'Max DB size',
            code: 'max-db-size',
            typeSlug: 'bytes',
            value: '80 GB',
            featureValue: 85899345920,
          },
          {
            name: 'vCPUS',
            code: 'cpu',
            typeSlug: 'number',
            value: '8',
            featureValue: 8,
          },
          {
            name: 'Max connection limit',
            code: 'connection-limit',
            typeSlug: 'number',
            value: '750',
            featureValue: 750,
          },
          {
            name: 'Memory',
            code: 'memory',
            typeSlug: 'bytes',
            value: '16 GB',
            featureValue: 17179869184,
          },
          {
            name: 'Backups',
            code: 'backup',
            typeSlug: 'object',
            value: 'Daily - 7 Retained',
            featureValue: '',
          },
          {
            name: 'Metrics',
            code: 'metrics',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
          {
            name: 'PostGIS',
            code: 'postgis',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
          {
            name: 'Type',
            code: 'type-shared',
            typeSlug: 'boolean-shared',
            value: 'Dedicated',
            featureValue: false,
          },
          {
            name: 'Logs',
            code: 'logs',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
          {
            name: 'Migration Tool',
            code: 'migration',
            typeSlug: 'boolean',
            value: 'Yes',
            featureValue: true,
          },
        ],
      },
    ],
    features: [
      {
        name: 'vCPUS',
        code: 'cpu',
        type: 'NUMBER',
      },
      {
        name: 'Type',
        code: 'type-shared',
        type: 'NUMBER',
      },
      {
        name: 'Migration Tool',
        code: 'migration',
        type: 'NUMBER',
      },
      {
        name: 'Logs',
        code: 'logs',
        type: 'NUMBER',
      },
      {
        name: 'Memory',
        code: 'memory',
        type: 'FILESIZE',
      },
      {
        name: 'PostGIS',
        code: 'postgis',
        type: 'NUMBER',
      },
      {
        name: 'Max connection limit',
        code: 'connection-limit',
        type: 'NUMBER',
      },
      {
        name: 'Max DB size',
        code: 'max-db-size',
        type: 'FILESIZE',
      },
      {
        name: 'Backups',
        code: 'backup',
        type: 'NUMBER',
      },
      {
        name: 'Metrics',
        code: 'metrics',
        type: 'NUMBER',
      },
    ],
  },
  redis: {
    title: 'Redis',
    icon: 'https://static-assets.cellar.services.clever-cloud.com/logos/redis.svg',
    description: SHORT_DESC,
    items: [
      {
        id: 'plan_964e2ebf-5606-471f-8ec7-7f79264015d9',
        name: 'S',
        price: 8.67,
        features: [
          {
            name: 'Connection limit',
            code: 'connection-limit',
            typeSlug: 'number',
            value: '100',
            featureValue: 180,
          },
          {
            name: 'Databases',
            code: 'database',
            typeSlug: 'number',
            value: '100',
            featureValue: 100,
          },
          {
            name: 'Size',
            code: 'disk-size',
            typeSlug: 'bytes',
            value: '100MB',
            featureValue: 104857600,
          },
          {
            name: 'Isolation',
            code: 'isolation',
            typeSlug: 'boolean-shared',
            value: 'Dedicated',
            featureValue: false,
          },
          {
            name: 'Type',
            code: 'type-shared',
            typeSlug: 'boolean-shared',
            value: 'Dedicated',
            featureValue: false,
          },
          {
            name: 'CPU',
            code: 'cpu',
            typeSlug: 'number',
            value: '1 vCPU',
            featureValue: 1,
          },
        ],
      },
      {
        id: 'plan_24b6f0ca-18b8-44af-a9aa-9618a288048a',
        name: 'XXL',
        price: 190.71,
        features: [
          {
            name: 'Connection limit',
            code: 'connection-limit',
            typeSlug: 'number',
            value: '500',
            featureValue: 500,
          },
          {
            name: 'Databases',
            code: 'database',
            typeSlug: 'number',
            value: '100',
            featureValue: 100,
          },
          {
            name: 'Isolation',
            code: 'isolation',
            typeSlug: 'boolean-shared',
            value: 'Dedicated',
            featureValue: false,
          },
          {
            name: 'Size',
            code: 'disk-size',
            typeSlug: 'bytes',
            value: '2500MB',
            featureValue: 2684354560,
          },
          {
            name: 'Type',
            code: 'type-shared',
            typeSlug: 'boolean-shared',
            value: 'Dedicated',
            featureValue: false,
          },
          {
            name: 'CPU',
            code: 'cpu',
            typeSlug: 'number',
            value: '2 vCPUs',
            featureValue: 2,
          },
        ],
      },
      {
        id: 'plan_524805d6-d1e2-470b-a849-1e689c1958ca',
        name: 'XL',
        price: 78.08,
        features: [
          {
            name: 'Isolation',
            code: 'isolation',
            typeSlug: 'boolean-shared',
            value: 'Dedicated',
            featureValue: false,
          },
          {
            name: 'Connection limit',
            code: 'connection-limit',
            typeSlug: 'number',
            value: '500',
            featureValue: 500,
          },
          {
            name: 'Databases',
            code: 'database',
            typeSlug: 'number',
            value: '100',
            featureValue: 100,
          },
          {
            name: 'Size',
            code: 'disk-size',
            typeSlug: 'bytes',
            value: '1000MB',
            featureValue: 1048576000,
          },
          {
            name: 'Type',
            code: 'type-shared',
            typeSlug: 'boolean-shared',
            value: 'Dedicated',
            featureValue: false,
          },
          {
            name: 'CPU',
            code: 'cpu',
            typeSlug: 'number',
            value: '1 vCPU',
            featureValue: 1,
          },
        ],
      },
    ],
    features: [
      {
        name: 'Isolation',
        code: 'isolation',
      },
      {
        name: 'Type',
        code: 'type-shared',
      },
      {
        name: 'Databases',
        code: 'database',
      },
      {
        name: 'CPU',
        code: 'cpu',
      },
      {
        name: 'Connection limit',
        code: 'connection-limit',
      },
      {
        name: 'Size',
        code: 'disk-size',
      },
    ],
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
