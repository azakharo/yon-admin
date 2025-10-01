import {array, boolean, number, object, string} from 'yup';

import {paginationV8nSchema} from '@shared/api';
import {stringOptionalNullable} from '@shared/utils';

const totalInvestedMatchedUnmatchedBaseV8nSchema = object().shape({
  real: number().integer().required(),
  promo: number().integer().required(),
});

const totalInvestedMatchedV8nSchema =
  totalInvestedMatchedUnmatchedBaseV8nSchema.shape({
    matched: number().integer().required(),
  });

const totalInvestedUnmatchedV8nSchema =
  totalInvestedMatchedUnmatchedBaseV8nSchema.shape({
    unmatched: number().integer().required(),
  });

const portfolioStatBaseV8nSchema = object().shape({
  total_invested: object()
    .shape({
      total: number().integer().required(),
      matched: totalInvestedMatchedV8nSchema.required(),
      unmatched: totalInvestedUnmatchedV8nSchema.required(),
    })
    .required(),
  live_profit: object()
    .shape({
      live_profit: number().integer().required(),
      investment: number().integer().required(),
      current_value: number().integer().required(),
    })
    .required(),
  exit_profit: object()
    .shape({
      exit_profit: number().integer().required(),
      sold_quantity: number().integer().required(),
      platform_fee: number().integer().required(),
    })
    .required(),
  potential_profit: object()
    .shape({
      potential_profit: number().integer().required(),
      investment: number().integer().required(),
      estimated_value: number().integer().required(),
    })
    .required(),
});

export const portfolioEventBaseV8nSchema = object().shape({
  id: string().required(),
  name: string().required(),
  description: string().required(),
  start_date: string().required(),
  logo_url: stringOptionalNullable,
});

// eslint-disable-next-line unicorn/prefer-spread
export const portfolioEventV8nSchema = portfolioEventBaseV8nSchema.concat(
  portfolioStatBaseV8nSchema.shape({
    take_profit: number().integer().required(),
    stop_loss: number().integer().required(),
    auto_cancel: number().integer().required(),
    labels: array().of(string().required()),
    is_favorite: boolean().required(),
    trading_volume: number().integer().required(),
  }),
);

export const v8nSchemaOfGetPortfolioEventsResponse = paginationV8nSchema.shape({
  array: array().of(portfolioEventV8nSchema).required(),
});

export const portfolioSummaryStatV8nSchema = portfolioStatBaseV8nSchema;

export const portfolioEventDetailsV8nSchema =
  // eslint-disable-next-line unicorn/prefer-spread
  portfolioEventBaseV8nSchema.concat(
    portfolioStatBaseV8nSchema.shape({
      result: stringOptionalNullable,
      predict: object()
        .shape({
          side: string().required(),
          probability: number().required(),
        })
        .nullable(),
    }),
  );

export const eventResolutionOptionStatV8nSchema = object().shape({
  quantity: number().integer().nullable(),
  avg_bought_price: number().integer().nullable(),
  investment: number().integer().nullable(),
  current_value: number().integer().nullable(),
  current_price: number().integer().nullable(),
  live_profit: number().integer().nullable(),
  avg_exited_price: number().integer().nullable(),
  profit: number().integer().nullable(),
});
