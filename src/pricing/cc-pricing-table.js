import { css, html, LitElement } from 'lit-element';
import { dispatchCustomEvent } from '../lib/events.js';
import { i18n } from '../lib/i18n.js';
import '../atoms/cc-img.js';


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
 * interface Plan {
 *   name: string,
 *   price: number,
 *   features: feature[],
 * }
 * ```
 *
 * ```js
 * interface Feature {
 *   name: string,
 *   ?value: number|string,
 * }
 * ```
 * ## Images
 *
 * | | |
 * |-------|------|
 * | <img src="/src/assets/warning.svg" style="height: 1.5rem; vertical-align: middle"> | <code>warning.svg</code>
 * | <img src="/src/assets/redirection-off.svg" style="height: 1.5rem; vertical-align: middle"> | <code>redirection-off.svg</code>
 *
 * @prop { Boolean } error - Set if there was an error while retrieving data.
 * @prop { Boolean } skeleton - Enables skeleton screen UI pattern (loading hint).
 * @prop { Array<Item> } items - Sets the data needed for the content of the table
 * @prop { Array<Feature> } features - Sets the feature needed for the table (Act as columns)
 * @prop { String } pricingCurrency - Sets the currency needed (e.g: €)
 *
 * @event {CustomEvent<ExampleInterface>} cc-pricing-table:add-item - Fires XXX whenever YYY.
 *
 * @slot - The content of the button (text or HTML). If you want an image, please look at the `image` attribute.
 *
 * @cssprop {Color} --cc-loader-color - The color of the animated circle (defaults: `#2653af`).
 */
export class CcPricingTable extends LitElement {

  static get properties () {
    return {
      error: { type: Boolean },
      skeleton: { type: Boolean },
      items: { type: Array },
      features: { type: Array },
      pricingCurrency: { type: String },
    };
  }

  constructor () {
    super();
    this.error = false;
    this.skeleton = false;
  }

  /**
   * Format every items into a table row with their properties transformed into table data
   * @returns {Array<html>} returns a formatted array with all the items and their features associated
   */
  _renderItems () {
    return this.items.map((item) => {
      return html`<tr>
            <td><button @click=${() => this._onAddItem(item)}>Add</button></td>
            <td>${item.name}</td>
            ${this._renderItemFeatures(item.features)}
            <td class="price-item">${i18n('cc-pricing-table.price', { price: item.price })}</td>
           </tr>`;
    });
  }

  /**
   * Loop through every global feature and put the feature that we have in the item at the correct place
   * (this step is mandatory because the order of the global features can be in a different order than the one that
   * we have in the features for an item)
   * @returns {Array<html>} returns for an item all the features formatted and in the correct order
   */
  _renderItemFeatures (itemFeatures) {
    return this.features.map((feature) => {
      const value = itemFeatures.find((itemFeature) => feature.name === itemFeature.name).value;
      return html`<td>${value}</td>`;
    });
  }

  // DOCS: 7. Event handlers

  // If you listen to an event in your `render()` function,
  // use a private method to handle the event and prefix it with `_on`.
  _onAddItem (item) {
    dispatchCustomEvent(this, 'add-item', item);
  }

  render () {

    return html`
     <table>
        <tr>
            <th></th>
            <th>Plan</th>
            ${this.features.map((feature) => html`<th>${feature.name}</th>`)}
            <th>Price</th>
        </tr> 
            ${this._renderItems()}
     </table>
    `;
  }

  static get styles () {
    return [
      // language=CSS
      css`
        :host {
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

window.customElements.define('cc-pricing-table', CcPricingTable);
