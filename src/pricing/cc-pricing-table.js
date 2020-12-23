import { css, html, LitElement } from 'lit-element';
import { dispatchCustomEvent } from '../lib/events.js';
import { i18n } from '../lib/i18n.js';
import '../atoms/cc-img.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { withResizeObserver } from '../mixins/with-resize-observer.js';

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
     *   code: string,
     *   typeSlug: String,
     *   ?featureValue: number|string,
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
export class CcPricingTable extends withResizeObserver(LitElement) {

  static get properties () {
    return {
      error: { type: Boolean },
      skeleton: { type: Boolean },
      items: { type: Array },
      features: { type: Array },
      pricingCurrency: { type: String },
      _size: { type: String },
    };
  }

  constructor () {
    super();
    this.error = false;
    this.skeleton = false;
  }

  onResize ({ width }) {
    this._size = width;
  }

  _getFeatureName (featureCode) {
    switch (featureCode) {
      case 'backup':
        return i18n('cc-pricing-table.feature.backup');
      case 'connection-limit':
        return i18n('cc-pricing-table.feature.connection-limit');
      case 'cpu':
        return i18n('cc-pricing-table.feature.cpu');
      case 'database':
        return i18n('cc-pricing-table.feature.database');
      case 'disk-size':
        return i18n('cc-pricing-table.feature.disk-size');
      case 'encryption':
        return i18n('cc-pricing-table.feature.encryption');
      case 'isolation':
        return i18n('cc-pricing-table.feature.isolation');
      case 'logs':
        return i18n('cc-pricing-table.feature.logs');
      case 'max-db-size':
        return i18n('cc-pricing-table.feature.max-db-size');
      case 'memory':
        return i18n('cc-pricing-table.feature.memory');
      case 'metrics':
        return i18n('cc-pricing-table.feature.metrics');
      case 'migration':
        return i18n('cc-pricing-table.feature.migration');
      case 'mount':
        return i18n('cc-pricing-table.feature.mount');
      case 'node':
        return i18n('cc-pricing-table.feature.node');
      case 'postgis':
        return i18n('cc-pricing-table.feature.postgis');
      case 'type-shared':
        return i18n('cc-pricing-table.feature.type-shared');
      case 'mongo-version':
        return i18n('cc-pricing-table.feature.mongo-version');
    }
  }

  _getTypeFormat (typeSlug, value) {
    switch (typeSlug) {
      case 'number':
        return i18n('cc-pricing-table.type.number', { number: value });
      case 'bytes':
        return i18n('cc-pricing-table.type.bytes', { bytes: value });
      case 'boolean':
        return i18n('cc-pricing-table.type.boolean', { boolean: value });
      case 'boolean-shared':
        return i18n('cc-pricing-table.type.boolean-shared', { booleanShared: value });
      case 'mount':
        return i18n('cc-pricing-table.type.mount');
      case 'mongo-version':
        return i18n('cc-pricing-table.type.mongo-version');
      case 'object':
        return 'test-backup';
    }
  }

  _renderSmallItems () {
    return this.items.sort((i1, i2) => i1.price - i2.price).map((item) => {
      return html`
          <div class="plan">
            <div><button @click=${() => this._onAddItem(item)}>+</button></div>
            <div class="plan-name">${item.name}</div>
           ${this._renderSmallItemFeatures(item.features)}
            <div class="feature">
              <div class="name">Price</div>
              <div class="number-align">${i18n('cc-pricing-table.price', { price: item.price })}</div>
            </div>
          </div>
          `;
    });
  }

  _renderSmallItemFeatures (itemFeatures) {
    return this.features.map((feature) => {
      const currentFeature = itemFeatures.find((itemFeature) => feature.code === itemFeature.code);
      return html`
          <div class="feature">
            <div class="name">${this._getFeatureName(currentFeature.code)}</div>
            <div class="value">${this._getTypeFormat(currentFeature.typeSlug, currentFeature.featureValue)}</div>
          </div>
          `;
    });
  }

  /**
       * Format every items into a table row with their properties transformed into table data
       * @returns {Array<TemplateResult>} returns a formatted array with all the items and their features associated
       */
  _renderBigItems () {
    return this.items.sort((i1, i2) => i1.price - i2.price).map((item) => {
      return html`<tr>
                <td><button @click=${() => this._onAddItem(item)}>${i18n('cc-pricing-table.addButton')}</button></td>
                <td>${item.name}</td>
                ${this._renderBigItemFeatures(item.features)}
                <td class="number-align">${i18n('cc-pricing-table.price', { price: item.price })}</td>
               </tr>`;
    });
  }

  /**
       * Loop through every global feature and put the feature that we have in the item at the correct place
       * (this step is mandatory because the order of the global features can be in a different order than the one that
       * we have in the features for an item)
       * @returns {Array<html>} returns for an item all the features formatted and in the correct order
       */
  _renderBigItemFeatures (itemFeatures) {
    return this.features.map((feature) => {
      const currentFeature = itemFeatures.find((itemFeature) => feature.code === itemFeature.code);
      const classes = this._getAlignment(currentFeature.typeSlug);
      return html`<td class=${classMap(classes)}>${this._getTypeFormat(currentFeature.typeSlug, currentFeature.featureValue)}</td>`;
    });
  }



  _getAlignment (typeSlug) {
    if (typeSlug === 'number' || typeSlug === 'bytes') {
      return { 'number-align': true };
    }
    return { 'number-align': false };
  }

  // DOCS: 7. Event handlers

  // If you listen to an event in your `render()` function,
  // use a private method to handle the event and prefix it with `_on`.
  _onAddItem (item) {
    dispatchCustomEvent(this, 'add-item', item);
  }

  render () {
    if (this._size > 550) {
      return html`
         <table>
            <tr>
                <th></th>
                <th>Plan</th>
                ${this.features.map((feature) => html`<th>${this._getFeatureName(feature.code)}</th>`)}
                <th>${i18n('cc-pricing-table.priceName')}</th>
            </tr> 
                ${this._renderBigItems()}
         </table>
        `;
    }
    return html`
        <div class="container">
         ${this._renderSmallItems()}
        </div> 
        </div>
        `;
  }

  static get styles () {
    return [
      // language=CSS
      css`
            :host {
              display: block;
            } 
            
            /* Table properties for big screen size */
    
            table {
              border-collapse: collapse;
              border-spacing: 0;
              font-family: arial, sans-serif;
              width: 100%;
            }
    
            th {
              background-color: #f6f6fb;
              font-size: 1.25rem;
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
              font-size: 1.25rem;
              padding: 0.25rem;
            }
            
            /* Properties for small screen size */
            
            .plan {
              padding: 0.25rem;
            }
        
            .plan[data-state="closed"] {
              display: flex;
              flex-wrap: wrap;
            }
        
            .plan-name {
              font-style: italic;
              font-weight: bold;
            }
        
            .plan[data-state="closed"] .plan-name {
              width: 100%;
            }
        
            .feature {
              display: flex;
              justify-content: space-between;
            }
        
            .feature:not(:first-child) {
              border-top: 1px solid #e5e5e5;
            }
        
            .plan[data-state="closed"] .feature {
              border: none;
              display: contents;
            }
        
            .name {
              font-weight: bold;
            }
        
            .plan[data-state="closed"] .name {
              flex-wrap: wrap;
              font-weight: normal;
            }
        
            .plan[data-state="closed"] .name::after {
              content: ':';
              padding-right: 0.25rem;
            }
        
            .plan[data-state="closed"] .feature:not(:last-child) .value::after {
              content: ',';
              padding-right: 0.5rem;
            }
        
            .plan-add {
              margin-bottom: 0.25rem;
              padding: 0.25rem;
            }  
            
            /* Global properties */
            
            .number-align {
              text-align: right;
            }
      `,
    ];
  }
}

window.customElements.define('cc-pricing-table', CcPricingTable);
