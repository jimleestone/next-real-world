import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Article: {
      keyFields: ['id'],
    },
    Comment: {
      keyFields: ['id'],
    },
    Profile: {
      keyFields: ['username'],
    },
    AuthUser: {
      keyFields: ['id'],
    },
    Tag: {
      keyFields: ['name'],
    },
    Query: {
      fields: {
        feed: {
          keyArgs: [],
          merge(existing: any[], incoming: any[], { args, readField }) {
            const offset = args?.offset as number;
            const merged = existing ? existing.slice(0) : [];
            const existingIdSet = new Set(merged.map((article) => readField('id', article)));
            incoming = incoming.filter((article) => !existingIdSet.has(readField('id', article)));
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
        articles: {
          keyArgs: ['author', 'favorited', 'tag'],
          merge(existing: any[], incoming: any[], { args, readField }) {
            const offset = args?.offset as number;
            const merged = existing ? existing.slice(0) : [];
            const existingIdSet = new Set(merged.map((article) => readField('id', article)));
            incoming = incoming.filter((article) => !existingIdSet.has(readField('id', article)));
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },
  },
});
