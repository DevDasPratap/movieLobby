import NodeCache from 'node-cache';
import { config } from '../config';

const cache = new NodeCache({
  stdTTL: config.cacheTimeout,
  checkperiod: config.cacheTimeout * 0.2,
});

export const getCached = <T>(key: string): T | undefined => {
  return cache.get<T>(key);
};

export const setCache = <T>(key: string, value: T): void => {
  cache.set(key, value);
};

export const deleteCache = (key: string): void => {
  cache.del(key);
};

export const clearCache = (): void => {
  cache.flushAll();
};