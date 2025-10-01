export interface TotalInvestedMatchedUnmatched {
  total: number;
  value: number;
  bonus: number;
}

export interface PortfolioEventStat {
  totalInvested: {
    total: number;
    matched: TotalInvestedMatchedUnmatched;
    unmatched: TotalInvestedMatchedUnmatched;
  };
  liveProfit: {
    liveProfit: number;
    investment: number;
    currentValue: number;
  };
  exitProfit: {
    exitProfit: number;
    soldQuantity: number;
    platformFee: number;
  };
  potentialProfit: {
    potentialProfit: number;
    investment: number;
    estimatedValue: number;
  };
}

export interface PortfolioEventBase {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  logoUrl: string;
}

export interface PortfolioEvent extends PortfolioEventBase {
  stat: PortfolioEventStat;
  takeProfitOrderCount: number;
  stopLossOrderCount: number;
  autoCancelOrderCount: number;
  labels: string[];
  isFavorite: boolean;
  tradingVolume: number;
}

export type PortfolioSummaryStat = PortfolioEventStat;

export interface PortfolioEventDetails extends PortfolioEventBase {
  stat: PortfolioEventStat;
  wonOption: string; // after event finished
  selectedOption: string;
  selectedOptionProbability: number | null;
}

export interface EventResolutionOptionStat {
  quantity: number | null;
  avgBoughtPrice: number | null;
  investment: number | null;
  currentValue: number | null;
  currentPrice: number | null;
  liveProfit: number | null;
  avgExitedPrice: number | null;
  profit: number | null;
}

// The following enum values are backend-specific
export enum PickType {
  active = 'active',
  resolved = 'resolved',
  favorites = 'favorites',
}
