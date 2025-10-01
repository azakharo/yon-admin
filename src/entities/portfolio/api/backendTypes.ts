import {InferType} from 'yup';

import {
  eventResolutionOptionStatV8nSchema,
  portfolioEventBaseV8nSchema,
  portfolioEventDetailsV8nSchema,
  portfolioEventV8nSchema,
  portfolioSummaryStatV8nSchema,
  v8nSchemaOfGetPortfolioEventsResponse,
} from './backendSchemas';

export type PortfolioEventBaseOnBackend = InferType<
  typeof portfolioEventBaseV8nSchema
>;

export type PortfolioEventOnBackend = InferType<typeof portfolioEventV8nSchema>;
export type GetPortfolioEventsResponse = InferType<
  typeof v8nSchemaOfGetPortfolioEventsResponse
>;

export type PortfolioSummaryStatOnBackend = InferType<
  typeof portfolioSummaryStatV8nSchema
>;

export type PortfolioEventDetailsOnBackend = InferType<
  typeof portfolioEventDetailsV8nSchema
>;

export type EventResolutionOptionStatOnBackend = InferType<
  typeof eventResolutionOptionStatV8nSchema
>;
