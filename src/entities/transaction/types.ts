export interface Transaction {
  id: string;
  value: number;
  bonus: number;
  created: Date;
  relatedEntity: string;
  relatedEntityId: string;
  label: string;
  paymentType: string;
  meta: string[];
}
