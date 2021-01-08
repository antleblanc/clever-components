import { css, html, LitElement } from 'lit-element';
import { dispatchCustomEvent } from '../lib/events.js';
import { i18n } from '../lib/i18n.js';

/**
 * A component doing X and Y (one liner description of your component).
 *
 * * 🎨 default CSS display: `block`
 * <br>
 * 🧐 [component's source code on GitHub](https://github.com/CleverCloud/clever-components/blob/master/src/dir/cc-example-component.js)
 *
 * ## Details
 *
 * * Details about bla.
 * * Details about bla bla.
 * * Details about bla bla bla.
 *
 * ## Technical details
 *
 * * Technical details about foo.
 * * Technical details about bar.
 * * Technical details about baz.
 *
 * ## Type definitions
 *
 * ```js
 * interface ExampleInterface {
 *   one: string,
 *   two: number,
 *   three: boolean,
 * }
 * ```
 *
 * ## Images
 *
 * | | |
 * |-------|------|
 * | <img src="/src/assets/warning.svg" style="height: 1.5rem; vertical-align: middle"> | <code>warning.svg</code>
 * | <img src="/src/assets/redirection-off.svg" style="height: 1.5rem; vertical-align: middle"> | <code>redirection-off.svg</code>
 *
 * @prop {Zone} selectedZone - the hosting zone selected for the items
 * @prop {Array<Zone>} zones - Sets  all the zone for the select
 * @prop {Array<Item>} items  - Sets all the products selected to calculate the price
 * @prop {String} pricingCurrency - Sets the current pricing currency
 *
 * @event {CustomEvent<ExampleInterface>} cc-pricing-header:change-currency - Fires XXX whenever YYY.
 * @event {CustomEvent<ExampleInterface>} cc-pricing-header:change-zone - Fires XXX whenever YYY.
 *
 * @slot - The content of the button (text or HTML). If you want an image, please look at the `image` attribute.
 *
 * @cssprop {Color} --cc-loader-color - The color of the animated circle (defaults: `#2653af`).
 */
export class CcPricingHeader extends LitElement {

  static get properties () {
    return {
      _currencies: { type: Array },
      pricingCurrency: { type: String },
      selectedProducts: { type: Object },
      currency: { type: String },
      zones: { type: Array },
    };
  }

  constructor () {
    super();
    /** We use an object with the codes that we choose to support as we use the ```Intl.Numberformat()``` function
         * to format the prices which use the code so we don't need the symbol
         */
    this._currencies = [
      { code: 'EUR', displayValue: '€ EUR' },
      { code: 'GBP', displayValue: '£ GBP' },
      { code: 'USD', displayValue: '$ USD' },
    ];
    this.currency = 'EUR';
    this.selectedProducts = {};
    // TODO: Temp to change default array
    this.zones = [
      {
        name: 'mtl',
        country: 'Canada',
        countryCode: 'CA',
        city: 'Montreal',
        lat: 45.50,
        lon: -73.61,
        tags: ['infra:ovh'],
      },
      {
        name: 'acme-corp',
        displayName: 'ACME Corp',
        country: 'Germany',
        countryCode: 'DE',
        city: 'Berlin',
        lat: 52.52,
        lon: 13.39,
        tags: ['region:eu', 'scope:private'],
      },
      {
        name: 'nyc',
        country: 'United States',
        countryCode: 'US',
        city: 'New York City',
        lat: 40.71,
        lon: -74.01,
        tags: ['infra:clever-cloud'],
      },
    ];
  }

  _getTotalPrice () {
    let totalPrice = 0;
    for (const p of Object.values(this.selectedProducts)) {
      if (p != null) totalPrice += p.item.price * p.quantity;
    }
    return totalPrice;
  }

  _onCurrencyChange (e) {
    dispatchCustomEvent(this, 'change-currency', e.target.value);
  }

  render () {

    return html`
            <div class="header">
                <div class="select-currency">
                   ${i18n('cc-pricing-header.currency-text')}:
                    <select @change=${this._onCurrencyChange}>
                        ${this._currencies.map((c) => html`
                            <option value=${c.code}>${c.displayValue}</option>`)}
                    </select>
                </div>
                <div class="zones">
                  <cc-zone-input
                    .zones=${this.zones}
                  >
                  </cc-zone-input>
                </div>
                <div class="est-cost">
                  ${i18n('cc-pricing-header.est-cost')}:
                    ${i18n('cc-pricing-header.price', { price: this._getTotalPrice(), code: this.currency })}
                </div>
            </div>
        `;
  }

  static get styles () {
    return [
      // language=CSS
      css`
                :host {
                    /* You may use another display type but you need to define one. */
                    display: block;
                    margin-bottom: 1.5rem;
                    background-color: #FFFAFA;
                    box-shadow: 0 0 0.5rem #aaa;
                    padding: 1rem;
                    wdith: 100%;
                }

                .zones {
                    max-width: 550px;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            `,
    ];
  }
}

window.customElements.define('cc-pricing-header', CcPricingHeader);
