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
