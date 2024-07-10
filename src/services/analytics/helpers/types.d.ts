import type { AggTransaction } from '../../../data/transaction/types.d.ts';
import type { Portfolio } from '../../../entities/portfolio.d.ts';

export type GroupCriteria = '*' | 'portfolio' | 'asset' | 'type' | 'date';
export type GroupFields = 'portfolioId' | 'type' | 'ticker' | 'timestamp';

interface Opts {
  identifierField: GroupFields;
  resolveIdentifier: (t: AggTransaction) => string | number;
  resolveValue: (identifier: string | number) => string | number;
}

export function aggregate(
  transactions: AggTransaction[],
): Partial<AggTransaction>;

export function groupByDefault(
  transactions: AggTransaction[],
  opts: Opts,
): Partial<AggTransaction>[];

export function groupByPortfolio(
  transactions: AggTransaction[],
  opts: Opts & { portfolios: Portfolio[] },
): Partial<AggTransaction>[];

export type GroupFunctionMap = Record<
  GroupCriteria,
  (
    transactions: AggTransaction[],
    opts: { portfolios: Portfolio[] },
  ) => Partial<AggTransaction>[]
>;
