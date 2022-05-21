import { PaymentTypeEnum } from './enums';
const paymentTypes = new PaymentTypeEnum();

export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type PaymentType = 'CASH' | 'COUPON';

export type Payment = {
  type: PaymentType;
  percentage?: number;
  amount?: number;
};

export function charge(invoice: Invoice, payments: Payment[]): Receipt {
  const { total } = invoice;
  const deposit = calculateDeposit(total, payments);
  if (total > deposit) {
    throw new Error('Shortage');
  }

  const isEveryPayementTypeCoupon = payments.every(p => isCoupon(p));
  const change = isEveryPayementTypeCoupon ? 0 : deposit - total;
  return { total, deposit, change };
}

function sortPayments(payments: Payment[]): Payment[] {
  return payments.sort((a, b) => {
    const sortOrderA = paymentTypes.valueOf(a.type)?.sortOrder as number;
    const sortOrderB = paymentTypes.valueOf(b.type)?.sortOrder as number;
    return sortOrderA - sortOrderB;
  });
}

function isCoupon(payment: Payment): boolean {
  return payment.type === paymentTypes.Coupon.code;
}

function getDiscountedPrice(total: number, payment: Payment): number {
  if (!payment.percentage) {
    return payment.amount || 0;
  } else {
    return Math.floor(total * (payment.percentage / 100));
  }
}

function calculateDeposit(total: number, payments: Payment[]): number {
  // FIXME: 直接 const deposit = () => { return xxx; } する方法があるかも？
  let deposit = 0;

  sortPayments(payments).map((p) => {
    if (isCoupon(p)) {
      deposit += getDiscountedPrice(total, p);
    } else if (deposit >= total) {
      throw new Error('OverCharge');
    } else {
      deposit += p.amount || 0;
    }
  });

  return deposit;
}
