// DOCS: Don't add a 'use strict', no need for them in modern JS modules.
// DOCS: Put all imports here.
// DOCS: Always keep the ".js" at the end when you reference a file directly [error in ESLint].
// DOCS: We enforce import order [fixed by ESLint].
import { css, html, LitElement } from 'lit-element';
import { dispatchCustomEvent } from '../lib/events.js';
import { i18n } from '../lib/i18n.js';

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
 * @prop {Zone} selectedZone - Sets the zone selected for the items
 * @prop {Array<Zone>} zones - Sets all the zone
 * @prop {String} pricingCurrency - Sets the current pricingCurrency
 *
 * @event {CustomEvent<ExampleInterface>} cc-pricing-estimation:remove-product - Fires XXX whenever YYY.
 * @slot - The content of the button (text or HTML). If you want an image, please look at the `image` attribute.
 *
 * @cssprop {Color} --cc-loader-color - The color of the animated circle (defaults: `#2653af`).
 */
export class CcPricingEstimation extends LitElement {

  // DOCS: 1. LitElement's properties descriptor

  static get properties () {
    return {
      selectedProducts: { type: Array },
    };
  }

  // DOCS: 2. Constructor

  constructor () {
    super();
    this.selectedProducts = [];
  }

  /**
   * Documentation of this awesome method.
   * @param {String} foo - Docs for foo.
   * @param {Boolean} bar - Docs for bar.
   */
  publicMethod (foo, bar) {
    // Do something
  }

  _renderSelProducts () {
    return this.selectedProducts.map((p) => {
     return html`
        <tr>
            <td><button @click=${() => this._onDeleteProduct(p)}>-</button></td>
            <td>${p.productName}</td>
            <td>${p.item.name}</td>
            <td>${Math.floor(Math.random() * Math.floor(10))}</td>
            <td class="price-item">${i18n('cc-pricing-table.price', { price: p.item.price })}</td>
        </tr>
       `;
    });
  }

  _onDeleteProduct (product) {
    dispatchCustomEvent(this, 'remove-product', product);
  }

  render () {

    return html`
     <table>
        <tr>
            <th></th>
            <th>Product</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr> 
            ${this._renderSelProducts()}
     </table>
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

        table {
          border-collapse: collapse;
          font-family: arial, sans-serif;
          width: 100%;
        }

        td, th {
          border: 1px solid #dddddd;
          padding: 8px;
          text-align: left;
        }

        tr:nth-child(even) {
          background-color: #dddddd;
        }

        .price-item {
          text-align: right;
        }
      `,
    ];
  }
}

// DOCS: 12. Define the custom element

window.customElements.define('cc-pricing-estimation', CcPricingEstimation);
