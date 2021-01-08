// DOCS: Don't add a 'use strict', no need for them in modern JS modules.
// DOCS: Put all imports here.
// DOCS: Always keep the ".js" at the end when you reference a file directly [error in ESLint].
// DOCS: We enforce import order [fixed by ESLint].
import { css, html, LitElement } from 'lit-element';
import './cc-pricing-header.js';
import './cc-pricing-product.js';
import './cc-pricing-estimation.js';
import { dispatchCustomEvent } from '../lib/events.js';

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
 * interface Product {
 *   title: String,
 *   icon: String,
 *   description: String,
 *   items: Array<Item>,
 *   features: Array<Feature>,
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
 * @prop {Array<Product>} products - List of the products available
 * @prop {Boolean} two - Description for two.
 * @prop {ExampleInterface[]} three - Description for three.
 *
 * @event {CustomEvent<ExampleInterface>} example-component:event-name - Fires XXX whenever YYY.
 *
 * @slot - The content of the button (text or HTML). If you want an image, please look at the `image` attribute.
 *
 * @cssprop {Color} --cc-loader-color - The color of the animated circle (defaults: `#2653af`).
 */
export class CcPricingPage extends LitElement {

  // DOCS: 1. LitElement's properties descriptor

  static get properties () {
    return {
      products: { type: Array },
      _selectedProducts: { type: Object },
      _currency: { type: String },
    };
  }

  // DOCS: 2. Constructor

  constructor () {
    super();
    this._selectedProducts = {};
    this._currency = 'EUR';
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

  _onAddProduct ({ detail: product }) {
    const id = product.item.id;
    if (this._selectedProducts[id] == null) {
      this._selectedProducts[id] = { ...product, quantity: 0 };
    }
    this._selectedProducts[id].quantity += 1;
    this._selectedProducts = { ...this._selectedProducts };
  }

  _onQuantityChanged ({ detail: product }) {
    const id = product.item.id;
    if (product.quantity <= 0) this._selectedProducts[id] = null;
    else this._selectedProducts[id].quantity = product.quantity;

    this._selectedProducts = { ...this._selectedProducts };
  }

  _onCurencyChanged ({ detail: currency }) {
    console.log('currency changed with', currency);
    this._currency = currency;
  }

  // It's common to use private methods not to have too much code in `render()`.
  // We often use this for i18n multiple cases.
  /**
   * Documentation of this awesome method.
   * @param {String} foo - Docs for foo.
   * @param {Boolean} bar - Docs for bar.
   */
  _renderProducts () {
    return this.products.map((p) => {
      return html`
        <div>
          <cc-pricing-product
              title=${p.title}
              icon=${p.icon}
              description=${p.description}
              currency=${this._currency}
              .items=${p.items}
              .features=${p.features}
              @cc-pricing-product:add-product=${this._onAddProduct}
          >
          </cc-pricing-product>
        </div>
      `;
    });
  }

  render () {

    return html`
      <div class="header">
        <cc-pricing-header 
            .selectedProducts=${this._selectedProducts}
            currency=${this._currency}
            @cc-pricing-header:change-currency=${this._onCurencyChanged}
        >
        </cc-pricing-header>
      </div>
      <div class="products">
        ${this._renderProducts()}
      </div>
      <div class="estimation">
        <cc-pricing-estimation
            .selectedProducts=${this._selectedProducts}
            currency=${this._currency}
            @cc-pricing-estimation:change-quantity=${this._onQuantityChanged}
        >
        </cc-pricing-estimation>
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
        }

        .products div {
          margin-bottom: 0.5rem;
        }
      `,
    ];
  }
}

// DOCS: 12. Define the custom element

window.customElements.define('cc-pricing-page', CcPricingPage);
