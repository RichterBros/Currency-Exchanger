// project business logic goes here
// exports!

export class Exchange {
  constructor(USD, AED, ARS, AUD, BGN) {
    this.USD = USD;
    this.AED = AED;
    this.ARS = ARS;
    this.AUD = AUD;
    this.BGN = BGN;
  }

  usdToAed() {
    return parseFloat(this.USD * this.AED).toFixed(2);
  }
  usdToArs() {
    return parseFloat(this.USD * this.ARS).toFixed(2);
  }

}