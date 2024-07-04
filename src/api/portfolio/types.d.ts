import * as SchemaType from 'json-schema-to-ts';
import type { API, ProtectedEndpoint } from '../types.d.ts';
import type { PortfolioService } from '../../services/portfolio/types.d.ts';
import type { Portfolio } from '../../entities/portfolio.d.ts';
import * as schemas from './schemas.js';

type CreateParam = SchemaType.FromSchema<typeof schemas.create>;
type UpdateParam = SchemaType.FromSchema<typeof schemas.update>;
type PortfolioParam = SchemaType.FromSchema<typeof schemas.portfolio>;
type DeleteParam = SchemaType.FromSchema<typeof schemas.remove>;

export interface PortfolioApi extends API {
  create: ProtectedEndpoint<CreateParam, Promise<Portfolio>>;
  update: ProtectedEndpoint<UpdateParam, Promise<Portfolio>>;
  portfolio: ProtectedEndpoint<PortfolioParam, Promise<Portfolio>>;
  remove: ProtectedEndpoint<DeleteParam, Promise<{ removed: boolean }>>;
}

interface Deps {
  portfolioService: PortfolioService;
}

export function init(deps: Deps): PortfolioApi;
