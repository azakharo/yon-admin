// The values are defined on the backend
export enum OrderType {
  limit = 'limit',
  quantity = 'quantity',
  maxInvestment = 'max_investment',
}

// The values are defined on the backend
export enum ChoiceVariant {
  yes = 'yes',
  no = 'no',
}

// The values are defined on the backend
export enum MarketType {
  quantity = 'quantity',
  maxInvestment = 'max_investment',
}

export interface Order {
  id: string;
  startDate: Date;
  endDate: Date;
  orderType: OrderType;
  choice: ChoiceVariant;
  eventId: string;
  requestedItemCount: number;
  requestedMaxInv: number;
  price: number | null;
  slippage: number | null;
  matching: MarketType | null;
}

// The values are defined by the backend
export enum AutoCancelStatus {
  pending = 'pending',
  settled = 'settled',
  failed = 'failed',
  canceled = 'canceled',
  voided = 'voided',
  executed = 'executed',
}

// The values are defined by the backend
export enum TriggerType {
  stop_loss = 'stop_loss',
  take_profit = 'take_profit',
}

export interface AutoCancel {
  orderId: string;
  timeoutAt: Date;
  status: AutoCancelStatus;
}

export interface StopLoss {
  orderId: string;
  triggerType: TriggerType;
  price: number;
  status: AutoCancelStatus;
}

export interface OrderFullInfo {
  id: string;
  startDate: Date;
  endDate: Date;
  orderType: OrderType;
  choice: ChoiceVariant;
  requested_items_quantity: number | null;
  executed_items_quantity: number | null;
  requested_max_inv: number | null;
  executed_max_inv: number | null;
  investment: number | null;
  invested: number | null;
  current_value: number | null;
  live_profit: number | null;
  auto_cancel: AutoCancel | null;
  stop_loss: StopLoss | null;
  take_profit: StopLoss | null;
  price: number | null;
  slippage: number | null;
  selling_price: number | null;
  potential_profit: number | null;
  avg_exit_price: number | null;
  unfilled: number | null;
  matched_quantity: number | null;
  matching: MarketType | null;
  profit: number | null;
}
