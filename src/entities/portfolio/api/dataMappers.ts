import isNil from 'lodash/isNil';

import {getDateFromIsoString} from '@shared/api';
import {currencyValueDivider} from '@shared/constants';
import {
  EventResolutionOptionStat,
  PortfolioEvent,
  PortfolioEventBase,
  PortfolioEventDetails,
  PortfolioEventStat,
  PortfolioSummaryStat,
} from '../types';
import {
  EventResolutionOptionStatOnBackend,
  PortfolioEventBaseOnBackend,
  PortfolioEventDetailsOnBackend,
  PortfolioEventOnBackend,
  PortfolioSummaryStatOnBackend,
} from './backendTypes';

const mapTotalInvestedMatchedFromBackend = ({
  matched,
  real,
  promo,
}: PortfolioEventOnBackend['total_invested']['matched']): PortfolioEventStat['totalInvested']['matched'] => {
  return {
    total: matched / currencyValueDivider,
    value: real / currencyValueDivider,
    bonus: promo / currencyValueDivider,
  };
};

const mapTotalInvestedUnmatchedFromBackend = ({
  unmatched,
  real,
  promo,
}: PortfolioEventOnBackend['total_invested']['unmatched']): PortfolioEventStat['totalInvested']['unmatched'] => {
  return {
    total: unmatched / currencyValueDivider,
    value: real / currencyValueDivider,
    bonus: promo / currencyValueDivider,
  };
};

const mapTotalInvestedFromBackend = ({
  total,
  unmatched,
  matched,
}: PortfolioEventOnBackend['total_invested']): PortfolioEventStat['totalInvested'] => {
  return {
    total: total / currencyValueDivider,
    matched: mapTotalInvestedMatchedFromBackend(matched),
    unmatched: mapTotalInvestedUnmatchedFromBackend(unmatched),
  };
};

const mapLiveProfitFromBackend = ({
  live_profit,
  investment,
  current_value,
}: PortfolioEventOnBackend['live_profit']): PortfolioEventStat['liveProfit'] => {
  return {
    liveProfit: live_profit / currencyValueDivider,
    investment: investment / currencyValueDivider,
    currentValue: current_value / currencyValueDivider,
  };
};

const mapExitProfitFromBackend = ({
  exit_profit,
  sold_quantity,
  platform_fee,
}: PortfolioEventOnBackend['exit_profit']): PortfolioEventStat['exitProfit'] => {
  return {
    exitProfit: exit_profit / currencyValueDivider,
    soldQuantity: sold_quantity,
    platformFee: platform_fee / currencyValueDivider,
  };
};

const mapPotentialProfitFromBackend = ({
  potential_profit,
  investment,
  estimated_value,
}: PortfolioEventOnBackend['potential_profit']): PortfolioEventStat['potentialProfit'] => {
  return {
    potentialProfit: potential_profit / currencyValueDivider,
    investment: investment / currencyValueDivider,
    estimatedValue: estimated_value / currencyValueDivider,
  };
};

export const mapPortfolioSummaryStatFromBackend = ({
  total_invested,
  live_profit,
  exit_profit,
  potential_profit,
}: PortfolioSummaryStatOnBackend): PortfolioSummaryStat => ({
  totalInvested: mapTotalInvestedFromBackend(total_invested),
  liveProfit: mapLiveProfitFromBackend(live_profit),
  exitProfit: mapExitProfitFromBackend(exit_profit),
  potentialProfit: mapPotentialProfitFromBackend(potential_profit),
});

export const mapPortfolioEventBaseFromBackend = ({
  id,
  name,
  description,
  start_date,
  logo_url,
}: PortfolioEventBaseOnBackend): PortfolioEventBase => ({
  id,
  name,
  description,
  startDate: getDateFromIsoString(start_date),
  logoUrl: logo_url ?? '',
});

export const mapPortfolioEventFromBackend = ({
  id,
  name,
  description,
  start_date,
  logo_url,
  take_profit,
  stop_loss,
  auto_cancel,
  labels,
  is_favorite,
  trading_volume,
  ...restProps
}: PortfolioEventOnBackend): PortfolioEvent => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ...mapPortfolioEventBaseFromBackend({
    id,
    name,
    start_date,
    logo_url,
  }),
  stat: mapPortfolioSummaryStatFromBackend(restProps),
  takeProfitOrderCount: take_profit,
  stopLossOrderCount: stop_loss,
  autoCancelOrderCount: auto_cancel,
  labels: labels ?? [],
  isFavorite: is_favorite,
  tradingVolume: trading_volume / currencyValueDivider,
});

export const mapPortfolioEventDetailsFromBackend = ({
  id,
  name,
  description,
  start_date,
  logo_url,
  result,
  predict,
  ...restProps
}: PortfolioEventDetailsOnBackend): PortfolioEventDetails => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ...mapPortfolioEventBaseFromBackend({
    id,
    name,
    start_date,
    logo_url,
  }),
  stat: mapPortfolioSummaryStatFromBackend(restProps),
  wonOption: result ?? '',
  selectedOption: predict?.side ?? '',
  selectedOptionProbability: predict?.probability ?? null,
});

const getResolutionOptionStatValueHelper = (
  value: number | null | undefined,
) => (isNil(value) ? null : value / currencyValueDivider);

export const mapEventResolutionOptionStatFromBackend = ({
  quantity,
  avg_bought_price,
  investment,
  current_value,
  current_price,
  live_profit,
  avg_exited_price,
  profit,
}: EventResolutionOptionStatOnBackend): EventResolutionOptionStat => ({
  quantity: quantity ?? null,
  avgBoughtPrice: getResolutionOptionStatValueHelper(avg_bought_price),
  investment: getResolutionOptionStatValueHelper(investment),
  currentValue: getResolutionOptionStatValueHelper(current_value),
  currentPrice: getResolutionOptionStatValueHelper(current_price),
  liveProfit: getResolutionOptionStatValueHelper(live_profit),
  avgExitedPrice: getResolutionOptionStatValueHelper(avg_exited_price),
  profit: getResolutionOptionStatValueHelper(profit),
});
