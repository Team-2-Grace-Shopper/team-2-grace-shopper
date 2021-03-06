import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import { getOrdersForPage } from '../store/orders';
import { Link } from "react-router-dom";
import dateFormat from 'dateformat';
import NumberFormat from 'react-number-format';

const OrderList = (props) => {
  const { data, offset, pageCount, showDetails, handleDetailClick } = props;

  return (
    <table id="orderstatustable">
      <thead>
        <tr>
          <th>Order #</th>
          <th>Date</th>
          <th>Status</th>
          <th>Number of Items</th>
          <th>Product Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((order, i) => {
          const dateFmt = dateFormat(order.orderDate, "ddd, mmm d, yyyy");
          const arriveDate = dateFormat(new Date().setDate(new Date().getDate() + Math.floor(1 + Math.random()*3)),'ddd, mmm d');

          const nbrItemsFmt = <NumberFormat value={order.orderlines.length}
            thousandSeparator=','
            displayType='text'
          />
          const orderTotFmt = <NumberFormat value={order.orderlines.reduce((tot, c) => tot += c.quantity * c.price, 0)}
            thousandSeparator=','
            prefix='$'
            fixedDecimalScale={true}
            decimalScale={2}
            displayType='text'
          />
          return (
            <tr key={order.id}>
              <td className="tblcenter">{order.id}</td>
              <td className="tblcenter">{dateFmt}</td>
              <td className="tblcenter">{order.status === 'closed' ? 'Delivered' : 'Arriving '.concat(arriveDate)}</td>
              <td className="tblcenter">{nbrItemsFmt}</td>
              <td className="tblright"> {orderTotFmt}</td>
              <td className="tblcenter"><a data-i={i} className="cta" onClick={() => handleDetailClick(i)}>Details <Icon icon="akar-icons:circle-chevron-down" width="15" /></a></td>
            </tr>
          )
        })}
      </tbody>
    </table>

  )
}

const OrderDetail = (props) => {
  const { orderDetails } = props;
  let productTotal = 0;

  return (
    <div id="orderdetails">
      <div>
        <h1>Grace Coffee.</h1>
        <h2>Order Details - Order #{orderDetails.id}</h2>
        <br />
        <div id="orderaddresses">
          <ol><strong>Bill To:</strong>
            <li>{orderDetails.billToName}</li>
            <li>{orderDetails.billToAddress}</li>
            <li>{orderDetails.billToCity + ', ' + orderDetails.billToState + ' ' + orderDetails.billToZip}</li>
            <li>{orderDetails.email}</li>
            <li>&nbsp; </li>
            <li>Order date: {dateFormat(orderDetails.orderDate, "ddd, mmm d, yyyy")}</li>
            <li>Order shipped: {dateFormat(orderDetails.shipDate, "ddd, mmm d, yyyy")}</li>
            <li>&nbsp; </li>
            <li>UPS tracking number: <a className="hyperlink" href="https://track24.net/?code=EV938507560CN" target="_blank">{orderDetails.trackingNumber}</a></li>
          </ol>
          <ol><strong>Ship To:</strong>
            <li>{orderDetails.shipToName}</li>
            <li>{orderDetails.shipToAddress}</li>
            <li>{orderDetails.shipToCity + ', ' + orderDetails.shipToState + ' ' + orderDetails.shipToZip}</li>
          </ol>
        </div>
        <table id="orderstatusdetailtable">
          <thead>
            <tr>
              <th>Line #</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.orderlines.map((line, i) => {
              const nbrItemsFmt = <NumberFormat value={line.quantity}
                thousandSeparator=','
                displayType='text'
              />
              const orderPriceFmt = <NumberFormat value={line.price}
                thousandSeparator=','
                prefix='$'
                fixedDecimalScale={true}
                decimalScale={2}
                displayType='text'
              />
              const orderTotFmt = <NumberFormat value={line.price * line.quantity}
                thousandSeparator=','
                prefix='$'
                fixedDecimalScale={true}
                decimalScale={2}
                displayType='text'
              />
              productTotal += line.price * line.quantity;
              return (
                <tr key={line.lineNbr}>
                  <td className="tblcenter">{line.lineNbr}</td>
                  <td >{line.product.name}</td>
                  <td className="tblcenter">{nbrItemsFmt}</td>
                  <td className="tblright"> {orderPriceFmt}</td>
                  <td className="tblright"> {orderTotFmt}</td>
                </tr>
              )
            })}
            <tr>
              <td colSpan={4} className="tblright">Product total</td>
              <td className="tblright"><NumberFormat value={productTotal}
                thousandSeparator=','
                prefix='$'
                fixedDecimalScale={true}
                decimalScale={2}
                displayType='text'
              />
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="tblright">Tax</td>
              <td className="tblright"><NumberFormat value={productTotal * .1}
                thousandSeparator=','
                prefix='$'
                fixedDecimalScale={true}
                decimalScale={2}
                displayType='text'
              />
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="tblright">Shipping</td>
              <td className="tblright"><NumberFormat value={1.95}
                thousandSeparator=','
                prefix='$'
                fixedDecimalScale={true}
                decimalScale={2}
                displayType='text'
              />
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="tblright">Order total</td>
              <td className="tblright"><NumberFormat value={productTotal + (productTotal * .1) + 1.95}
                thousandSeparator=','
                prefix='$'
                fixedDecimalScale={true}
                decimalScale={2}
                displayType='text'
              />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <iframe id="iframe"
        src="//track24.net/?code=EV938507560CN"
      >
      </iframe>

    </div>
  )
}

class _OrderHistory extends React.Component {
  constructor() {
    super();

    this.state = {
      ordersToDisplay: [],
      allOrders: [],
      offset: 0,
      pageCount: 5,
      showDetails: null
    }
    this.handleDetailClick = this.handleDetailClick.bind(this);
  }
  handleDetailClick = (idx) => {
    // const newArr = this.state.showDetails.map((c,i) => i === idx ? !c : c)
    this.setState(Object.assign({}, this.state, { showDetails: idx }))
  }

  async componentDidMount() {
    await this.props.getOrdersForPage(this.state.offset, this.state.pageCount, this.props.userId);
    await this.getDataFromServer();
    this.setState(Object.assign({},
      this.state,
      {
        ordersToDisplay: this.state.allOrders,
        showDetails: null
      }
    ))
    // { ordersToDisplay: this.state.allOrders.slice(0,this.state.pageCount)}))
    //console.log('all data', this.state.allData)
  }

  getDataFromServer() {
    const res = [];
    for (let i = 0; i < 32; i++) {
      res[i] = Math.random() * 32
    }
    //    console.log('res', res)
    this.setState(Object.assign({}, this.state, { allData: res }))
  }

  handlePageClick = (data) => {
    const { selected } = data;
    const start = selected * this.state.pageCount;
    const res = this.state.allData.slice(start, start + this.state.pageCount)
    this.setState(Object.assign({}, this.state, { data: res }))

    // read those rows from the server instead of an array

    //    let offset = Math.ceil(selected * this.props.perPage);
    // this.setState({ offset: offset }, () => {
    //   this.loadCommentsFromServer();
    // });
  };

  render() {
    const _allpurchase = this.props.allOrders.map(order => [...order.orderlines.map(purchase => purchase.product)]);
    const allpurchase = _allpurchase.reduce((acc, curr) => {
      return acc.concat(curr)
    }, [])

    // const allpurchase = _allpurchase.map(productinfo => productinfo[0].product.name)
    if (this.props.allOrders && this.props.allOrders.length === 0) {
      return <h2 id="content-wrapper" style={{ marginTop: 50, textAlign: 'center', marginBottom: 50 }}>There are no orders in the system</h2>
    }
    return (
      <div id="content-wrapper">
        <div className="itemList-admin container">
          <h2>{this.props.name}, your order status</h2>
          <div className="container">
            <OrderList data={this.props.allOrders} handleDetailClick={this.handleDetailClick} offset={this.state.offset} pageCount={this.state.pageCount} />
            {this.state.totalOrders > this.state.pageCount &&
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            }
            {this.state.showDetails !== null &&
              <OrderDetail orderDetails={this.props.allOrders[this.state.showDetails]} />
            }
          </div>
        </div>
        <div className="container">
          {/* section headline with line format start */}
          <hr /><h2 className="hrtxt">Purchase again</h2>
          <br /><br />
          {/* section headline with line format end */}
          <div className="itemList col4">
            <div>
              {allpurchase.map((product, idx) => {
                return idx < 4 ? (
                  <div className="itemcard" key={product.name}>
                    <Link
                      to={
                        product.type === "coffee"
                          ? `coffees/${product.id}`
                          : `accessories/${product.id}`
                      }
                    >
                      <img src={product.imageUrl1} />
                      <br />
                      <h3>{product.name}</h3>
                      <button className="hyperlink">View detail</button>
                    </Link>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    allOrders: state.orders,
    userId: state.auth.id,
    name: state.auth.name
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    //change in the future to read specific rows as they paginate
    getOrdersForPage: (offset, limit, id) => dispatch(getOrdersForPage({ offset: offset, limit: limit, userId: id })),
  }
}
const OrderHistory = connect(mapStateToProps, mapDispatchToProps)(_OrderHistory)

export default OrderHistory;