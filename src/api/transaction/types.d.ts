import * as SchemaType from 'json-schema-to-ts';
import type { API, ProtectedEndpoint } from '../types.d.ts';
import type { TypedTransaction } from '../../entities/transaction.d.ts';
import type { TransactionService } from '../../services/transaction/types.d.ts';
import * as schemas from './schemas.js';

type CreateParam = SchemaType.FromSchema<typeof schemas.create>;
type UpdateParam = SchemaType.FromSchema<typeof schemas.update>;
type GetForUserParam = SchemaType.FromSchema<typeof schemas.getForUser>;
type GetByPortfolioParam = SchemaType.FromSchema<typeof schemas.getByPortfolio>;
type DeleteParam = SchemaType.FromSchema<typeof schemas.remove>;

export interface TransactionApi extends API {
  create: ProtectedEndpoint<CreateParam, Promise<TypedTransaction>>;
  update: ProtectedEndpoint<UpdateParam, Promise<TypedTransaction>>;
  transactions: ProtectedEndpoint<GetForUserParam, Promise<TypedTransaction[]>>;
  portfolio: ProtectedEndpoint<
    GetByPortfolioParam,
    Promise<TypedTransaction[]>
  >;
  remove: ProtectedEndpoint<DeleteParam, Promise<{ removed: boolean }>>;
}

interface Deps {
  transactionService: TransactionService;
}

export function init(deps: Deps): TransactionApi;
