import { css, html, LitElement } from 'lit-element';
import { dispatchCustomEvent } from '../lib/events.js';
import { i18n } from '../lib/i18n.js';
import '../atoms/cc-img.js';
import './cc-pricing-table.js';

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
 * interface Item {
 *   name: string,
 *   pricing: number,
 *   features: feature[],
 * }
 * ```
 *
 * ```js
 * interface Feature {
 *   code: string,
 *   value: string|number|boolean,
 * }
 * ```
 * ## Images
 *
 * | | |
 * |-------|------|
 * | <img src="/src/assets/warning.svg" style="height: 1.5rem; vertical-align: middle"> | <code>warning.svg</code>
 * | <img src="/src/assets/redirection-off.svg" style="height: 1.5rem; vertical-align: middle"> | <code>redirection-off.svg</code>
 *
 * @prop {Array<Item>>} items - Sets the url of the logo before the title.
 * @prop {String} name  - Sets the title of the product.
 * @prop {String} description - Sets the description of the product
 * @prop {String} logoUrl - Sets the url of the product image
 * @prop {Boolean} error - Set if there was an error while retrieving data.
 * @prop {Boolean} skeleton
 * @prop {string} pricingCurrency - Enables skeleton screen UI pattern (loading hint).
 *
 * @event {CustomEvent<ExampleInterface>} cc-pricing-product:add-product - Fires XXX whenever YYY.
 */
export class CcPricingProduct extends LitElement {

  static get properties () {
    return {
      icon: { type: String },
      title: { type: String },
      error: { type: Boolean },
      skeleton: { type: Boolean },
      description: { type: String },
      items: { type: Array },
      features: { type: Array },
    };
  }

  constructor () {
    super();
    this.error = false;
    this.skeleton = false;
  }

  // DOCS: 7. Event handlers

  // If you listen to an event in your `render()` function,
  // use a private method to handle the event and prefix it with `_on`.
  _onAddProduct ({detail: item}) {
    const product = this.title;
    dispatchCustomEvent(this, 'add-product', { productName: product, item });
  }

  render () {

    return html`
     <div class="head">
        <cc-img src="${this.icon}" alt="${this.title}-logo"></cc-img>
        <div class="title">${this.title}</div>
     </div>
     <div class="description">${this.description}</div>
     <cc-pricing-table 
     .items=${this.items}
     .features=${this.features}
     @cc-pricing-table:add-item=${this._onAddProduct}
     ></cc-pricing-table>
    `;
  }

  static get styles () {
    return [
      // language=CSS
      css`
        :host {
          display: grid;
          gap: 1rem;
          box-shadow: 0 0 0.5rem #aaa;
        } 
        
        .head {
          display: flex;
          align-items: center;
          padding: 1rem 1rem 0 1rem;
        }
        
        .title {
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .description {
          padding: 0 1rem;
        }
        
        cc-img {
          height: 3rem;
          width: 3rem;
          border-radius: 0.25rem;
          margin-right: 1rem;
        }
        
      `,
    ];
  }
}

window.customElements.define('cc-pricing-product', CcPricingProduct);
