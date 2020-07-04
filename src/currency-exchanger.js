
export class Exchange {
  constructor(USD, AED, ARS, AUD, BGN, BRL) {
    this.USD = USD;
    this.AED = AED;
    this.ARS = ARS;
    this.AUD = AUD;
    this.BGN = BGN;
    this.BRL = BRL;
  }

  usdToAed() {
    return parseFloat(this.USD * this.AED).toFixed(2);
  }
  usdToArs() {
    return parseFloat(this.USD * this.ARS).toFixed(2);
  }
  usdToAud() {
    return parseFloat(this.USD * this.AUD).toFixed(2);
  }

  usdToBgn() {
    return parseFloat(this.USD * this.BGN).toFixed(2);
  }

  usdToBrl() {
    return parseFloat(this.USD * this.BRL).toFixed(2);
  }
}
