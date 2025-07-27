declare module "razorpay" {
  interface RazorpayOrder {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
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
