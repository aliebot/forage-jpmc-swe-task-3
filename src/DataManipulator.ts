import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc : number,
  price_def : number,
  ratio : number,
  upper_bound : number,
  lower_bound : number,
  trigger_alert : number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]) {
    const price_abc = (serverRespond[0].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const price_def = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = price_abc / price_def;
    const upper_bound = 1 + 0.10;
    const lower_bound = 1 - 0.10;
      return {
        price_abc,
        price_def,
        ratio,
        timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
        upper_bound,
        lower_bound,
        trigger_alert: (ratio > upper_bound || ratio > lower_bound) ? ratio : undefined,
      };
  }
}
