import {TabAttrs} from '@shared/components';
import {StatusFilter} from './api';

export const tooltipLiveProfit =
  'Potential profit based on current market price. Platform fee not included.';
export const tooltipPotentialProfit =
  'Shown profit excludes platform fees, slippage, and assumes a successful pick.';
export const tooltipExitProfit =
  'Profit from exits before event resolution, after platform fee.';

export const statusFilterTabs: TabAttrs<StatusFilter>[] = [
  {
    label: 'Matched',
    value: StatusFilter.matched,
  },
  {
    label: 'Unmatched',
    value: StatusFilter.unmatched,
  },
  {
    label: 'Exiting',
    value: StatusFilter.exiting,
  },
  {
    label: 'Exited',
    value: StatusFilter.exited,
  },
  {
    label: 'Canceled',
    value: StatusFilter.canceled,
  },
];
