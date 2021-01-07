// DOCS: Don't add a 'use strict', no need for them in modern JS modules.
// DOCS: Put all imports here.
// DOCS: Always keep the ".js" at the end when you reference a file directly [error in ESLint].
// DOCS: We enforce import order [fixed by ESLint].
import { css, html, LitElement } from 'lit-element';
import {i18n} from "../lib/i18n";

// DOCS: You may setup/init some stuffs here but this should be rare and most of the setup should happen in the component.
const MY_AWESOME_CONST = 'foobar';

// DOCS: You may setup/init constant data used when component is in skeleton state.
const SKELETON_FOOBAR = [
  { foo: '???????' },
  { foo: '????' },
  { foo: '???????' },
];

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

  // DOCS: 1. LitElement's properties descriptor

  static get properties () {
    return {
      _currencies: { type: Array },
      pricingCurrency: { type: String },
      selectedProducts: { type: Object },
    };
  }

  // DOCS: 2. Constructor

  constructor () {
    super();
    /** We use an object with the codes that we choose to support as we use the ```Intl.Numberformat()``` function
     /* to format the prices which use the code so we don't need the symbol
     * So we don't the symbol
     */
    this._currencies = [
      { code: 'EUR', displayValue: '€ EUR' },
      { code: 'GBP', displayValue: '£ GBP' },
      { code: 'USD', displayValue: '$ USD' },
    ];
    this.selectedProducts = {};
  }

  // DOCS: 3. Property getters

  // Use the underscore prefix convention to store the value in the getter/setter.
  // You probably don't need this if you didn't add a setter.
  get one () {
    return this._one;
  }

  // DOCS: 4. Property setters

  // LitElement automatically creates getters/setters for your properties described in `static get properties ()`.
  // If you need a setter to hook into a property,
  // you will need to call LitElement's `this.requestUpdate('propName', oldVal)` to maintain the auto render mechanism.
  // Use the underscore prefix convention to store the value in the getter/setter.
  set one (newVal) {
    const oldVal = this._one;
    this._one = newVal;
    this.requestUpdate('one', oldVal);
    // Do something
  }

  // DOCS: 5. Public methods

  // It's rare, but your component may need to expose methods.
  // Native DOM elements have methods to focus, submit form...
  // Use JSDoc to document your method.
  /**
   * Documentation of this awesome method.
   * @param {String} foo - Docs for foo.
   * @param {Boolean} bar - Docs for bar.
   */
  publicMethod (foo, bar) {
    // Do something
  }

  // DOCS: 6. Private methods

  // It's common to use private methods not to have too much code in `render()`.
  // We often use this for i18n multiple cases.
  _privateMethod () {
    // Do something
  }

  _getTotalPrice () {
    let totalPrice = 0;
    for (const p of Object.values(this.selectedProducts)) {
      if (p != null) totalPrice += p.item.price * p.quantity;
    }
    return totalPrice;
  }

  // DOCS: 7. Event handlers

  // If you listen to an event in your `render()` function,
  // use a private method to handle the event and prefix it with `_on`.
  _onSomething () {
    // Do something
  }

  // DOCS: 8. Custom element lifecycle callbacks

  // It's rare, but you may need to directly into the custom element lifecycle callbacks.
  // This is useful if you set intervals or listeners.
  connectedCallback () {
    super.connectedCallback();
    // Do something
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    // Do something
  }

  // DOCS: 9. LitElement lifecycle callbacks

  // If you need to setup some code before the first render, use this.
  // It's often needed if you component contains DOM managed by a 3rd party (chart, map...).
  firstUpdated () {

  }

  // DOCS: 10. LitElement's render method

  // All UI components will need this function to describe the "HTML template".
  render () {

    return html`
      <!-- To translate -->
      <div class="header">
        <div class="select-currency">
          Currency :
          <select>
            ${this._currencies.map((c) => html`<option value=${c.code}>${c.displayValue}</option>`)}
          </select>
        </div>
        <div class="est-cost">
          Estimated cost:
          ${i18n('cc-pricing-estimation.price', { price: this._getTotalPrice() })}
        </div>
      </div>
    `;
  }

  // DOCS: 11. LitElement's styles descriptor

  static get styles () {
    // This array may contain style imports from shared files.
    // Then you can defined your own component's styles.
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
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `,
    ];
  }
}

// DOCS: 12. Define the custom element

window.customElements.define('cc-pricing-header', CcPricingHeader);
