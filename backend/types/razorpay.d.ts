declare module "razorpay" {
  interface RazorpayOrder {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id: string | null;
    status: string;
    attempts: number;
    created_at: number;
  }

  interface RazorpayInstanceOptions {
    key_id: string;
    key_secret: string;
  }

  interface RazorpayOrderOptions {
    amount: number;
    currency: string;
    receipt: string;
  }

  class Razorpay {
    constructor(options: RazorpayInstanceOptions);
    orders: {
      create(params: RazorpayOrderOptions): Promise<RazorpayOrder>;
    };
  }

  export = Razorpay;
}
