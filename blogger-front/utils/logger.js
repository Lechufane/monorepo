/* eslint-disable no-console */
import { isProduction } from '@/services/constants';

/** A simple wrapper around `console.log` that only logs in development mode. */
const logger = {
  error: (...text) => !isProduction && console.error(...text),
  debug: (...text) => !isProduction && console.log('[DEBUG]', ...text),
};

export default logger;
