import type { AggTransaction } from '../../../data/transaction/types.d.ts';
import type { Portfolio } from '../../../entities/portfolio.d.ts';

export type GroupCriteria = 'portfolio' | 'asset' | 'type';
export type GroupFields = 'portfolioId' | 'type' | 'ticker';

export function groupByDefault(
  field: GroupFields,
  transactions: AggTransaction[],
): Partial<AggTransaction>[];

export function groupByPortfolio(
  transactions: AggTransaction[],
  opts: { portfolios: Portfolio[] },
): Partial<AggTransaction>[];

export type GroupFunctionMap = Record<
  GroupCriteria,
  (
    transactions: AggTransaction[],
    opts: { portfolios: Portfolio[] },
  ) => Partial<AggTransaction>[]
>;
