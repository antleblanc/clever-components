// DOCS: Don't add a 'use strict', no need for them in modern JS modules.
// DOCS: Put all imports here.
// DOCS: Always keep the ".js" at the end when you reference a file directly [error in ESLint].
// DOCS: We enforce import order [fixed by ESLint].
import '../atoms/cc-button.js';
import { css, html, LitElement } from 'lit-element';
import { dispatchCustomEvent } from '../lib/events.js';
import { i18n } from '../lib/i18n.js';
import { withResizeObserver } from '../mixins/with-resize-observer';

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
 * @prop {String} currency - Sets the current currency code
 *
 * @event {CustomEvent<ExampleInterface>} cc-pricing-estimation:change-quantity - Fires XXX whenever YYY.
 * @slot - The content of the button (text or HTML). If you want an image, please look at the `image` attribute.
 *
 * @cssprop {Color} --cc-loader-color - The color of the animated circle (defaults: `#2653af`).
 */
export class CcPricingEstimation extends withResizeObserver(LitElement) {

  // DOCS: 1. LitElement's properties descriptor

  static get properties () {
    return {
      selectedProducts: { type: Object },
      currency: { type: String },
    };
  }

  // DOCS: 2. Constructor

  constructor () {
    super();
    this.selectedProducts = {};
    this._totalPrice = 0;
    this.breakpoints = {
      width: [600],
    };
    this.currency = 'EUR';
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
    return Object.values(this.selectedProducts).map((p) => {
      if (p != null) {
        return html`
          <tr>
            <td>
              <button class="change-qt-btn"  @click=${() => this._onChangeQuantity(p, 'add')}>
                <img src=${new URL('../assets/add-button.svg', import.meta.url).href} />
              </button>
              <button class="change-qt-btn"  @click=${() => this._onChangeQuantity(p, 'remove')}>
                <img src=${new URL('../assets/remove-button.svg', import.meta.url).href} />
              </button>

            </td>
            <td>${p.productName}</td>
            <td>${p.item.name}</td>
            <td>${p.quantity}</td>
            <td class="price-item">${i18n('cc-pricing-table.price', { price: p.item.price * p.quantity, code: this.currency })}</td>
          </tr>
        `;
      }
    });
  }

  _getTotalPrice () {
    let totalPrice = 0;
    for (const p of Object.values(this.selectedProducts)) {
      if (p != null) totalPrice += p.item.price * p.quantity;
    }
    return totalPrice;
  }

  _onChangeQuantity (product, action) {
    if (action === 'remove') {
      dispatchCustomEvent(this, 'change-quantity', { ...product, quantity: product.quantity - 1 });
    } else if (action === 'add') {
      dispatchCustomEvent(this, 'change-quantity', { ...product, quantity: product.quantity + 1 });
    }
  }

  render () {
    // We reset the total price for his new calculation to erase the previous one
    // Is it good practice or nah ?
    console.log(this._getTotalPrice());
    return html`

      <table>
        ${this._getTotalPrice() > 0 ? html`
          <tr>
            <th></th>
            <th>${i18n('cc-pricing-estimation.product')}</th>
            <th>${i18n('cc-pricing-estimation.size')}</th>
            <th>${i18n('cc-pricing-estimation.quantity')}</th>
            <th>${i18n('cc-pricing-estimation.priceName')}</th>
          </tr>` : ''}
        ${this._renderSelProducts()}
      </table>

      <div class="recap">
        <div class="monthly-est">${i18n('cc-pricing-estimation.monthly-est')}:</div>
        <div class="cost-price"> ${i18n('cc-pricing-estimation.price', { price: this._getTotalPrice(), code: this.currency })} </div>
        <div class="recap-buttons">
          <cc-button class="contact-sales">${i18n('cc-pricing-estimation.sales')}</cc-button>
          <cc-button class="sign-up" outlined>${i18n('cc-pricing-estimation.sign-up')}</cc-button>
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
        }
        
        table {
          border-collapse: collapse;
          border-spacing: 0;
          font-family: arial, sans-serif;
          width: 100%;
        }

        th {
          background-color: #f6f6fb;
          font-size: 1.25rem;
          padding: 10px;
          text-align: left;
          text-shadow: 1px 1px 1px #fff;
        }

        table  th:first-child {
          border-radius: 10px 0 0 10px;
        }

        table th:last-child {
          border-radius: 0 10px 10px 0;
        }

        tr:nth-child(n+3) {
          border-top: 0.10rem solid #e5e5e5;
        }

        td {
          padding: 0.25rem;
        }

        .recap {
          background-color: #3a3771;
          border-radius: 0.2rem;
          color: white;
          display: grid;
          gap: 1rem;
          grid-template-areas: 
                "txt price"
                "btn btn";
          margin-top: 1rem;
          padding: 1rem 0 1rem 1rem;
        }

        :host([w-gte-600]) .recap {
          grid-template-areas: 
                "txt btn"
                "price btn";
        }

        :host([w-gte-600]) .recap-buttons {
          justify-self: right;
        }

        .monthly-est {
          align-self: center;
          grid-area: txt;
          justify-self: center;

        }

        .cost-price {
          align-self: center;
          font-size: 2rem;
          grid-area: price;
          justify-self: center;
        }

        .recap-buttons {
          align-self: center;
          display: flex;
          grid-area: btn;
          /*justify-self: right;*/
          justify-self: center;
          margin-right: 0.5rem;
        }

        .contact-sales {
          margin-right: 0.2rem;
        }

        .price-item {
          text-align: right;
        }


        .change-qt-btn {
          border: none;
          background: transparent;
        }

        .change-qt-btn img {
          width: 32px;
          height: 32px;
          filter: brightness(100%);
        }

        .change-qt-btn img:hover {
          filter: brightness(50%);
          transition: all 0.75s ease;
          -moz-transition: all 0.75s ease;
          -o-transition: all 0.75s ease;
          -ms-transition: all 0.75s ease;
          transition: all 0.75s ease;
          cursor: pointer;
        }
      `,
    ];
  }
}

// DOCS: 12. Define the custom element

window.customElements.define('cc-pricing-estimation', CcPricingEstimation);
