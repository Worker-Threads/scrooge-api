import * as SchemaType from 'json-schema-to-ts';
import type { API, ProtectedEndpoint } from '../types.d.ts';
import type { GeneralTransactionWithType } from '../../entities/transaction.d.ts';
import type { TransactionService } from '../../services/transaction/types.d.ts';
import * as schemas from './schemas.js';

type CreateParam = SchemaType.FromSchema<typeof schemas.create>;
type UpdateParam = SchemaType.FromSchema<typeof schemas.update>;
type GetForUserParam = SchemaType.FromSchema<typeof schemas.getForUser>;
type GetByPortfolioParam = SchemaType.FromSchema<typeof schemas.getByPortfolio>;
type DeleteParam = SchemaType.FromSchema<typeof schemas.remove>;

export interface TransactionApi extends API {
  create: ProtectedEndpoint<CreateParam, Promise<GeneralTransactionWithType>>;
  update: ProtectedEndpoint<UpdateParam, Promise<GeneralTransactionWithType>>;
  transactions: ProtectedEndpoint<
    GetForUserParam,
    Promise<GeneralTransactionWithType[]>
  >;
  portfolio: ProtectedEndpoint<
    GetByPortfolioParam,
    Promise<GeneralTransactionWithType[]>
  >;
  remove: ProtectedEndpoint<DeleteParam, Promise<{ removed: boolean }>>;
}

interface Deps {
  transactionService: TransactionService;
}

export function init(deps: Deps): TransactionApi;
