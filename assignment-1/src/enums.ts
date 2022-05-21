import { PaymentType } from './charge';

export class PaymentTypeEnum {
  readonly Coupon = { code: 'COUPON', sortOrder: 0 };
  readonly Cash =   { code: 'CASH', sortOrder: 1 };
  readonly values = [ this.Coupon, this.Cash ];
  readonly valueOf = (code: PaymentType) => {
    return this.values.find(v => v.code === code);
  }
}
