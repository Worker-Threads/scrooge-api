import pg from 'pg';

/** @param {import('pg').PoolConfig} config */
export const init = (config) => new pg.Pool(config);
