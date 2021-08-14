import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import { getOrdersForPage } from '../store/orders';
import dateFormat from 'dateformat';
import NumberFormat from 'react-number-format';

import { addToCart } from '../store/cart'; // TEST

const OrderList = (props) => {
  const { data, offset, pageCount, showDetails, handleDetailClick } = props;
  // const handleDetailClick = (ev) => {
  //   console.log('clicked', ev.target.dataset.i)
  // }
  //  const thisPage = ordersToDisplay.slice(offset, offset+pageCount)

  return (
    // <div id="project-comments" className="commentList">
    //   <li>
    //     {thisPage.map((c,i) => <ul key={i}>Order #{i} - {c}</ul> )}
    //   </li>
    // </div>      
    <table id="orderstatustable">
      <thead>
        <tr>
          <th>Order #</th>
          <th>Date</th>
          <th>Status</th>
          <th>Number of Items</th>
          <th>Order Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((order, i) => {
          const dateFmt = dateFormat(order.orderDate, "ddd, mmm d, yyyy");
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
              <td className="tblcenter">{order.status}</td>
              <td className="tblcenter">{nbrItemsFmt}</td>
              <td className="tblright"> {orderTotFmt}</td>
              <td className="tblcenter"><a data-i={i} onClick={() => handleDetailClick(i)}>Details <Icon icon="akar-icons:circle-chevron-down" width="15" /></a></td>
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
      <p>Order Number: {orderDetails.id}</p>
      <br />Order Date: { dateFormat(orderDetails.orderDate, "ddd, mmm d, yyyy")}
      <div id="orderaddresses">
        <ol><strong>Bill To:</strong>
          <li>{orderDetails.billToName}</li>
          <li>{orderDetails.billToAddress}</li>
          <li>{orderDetails.billToCity + ', ' + orderDetails.billToState + ' ' + orderDetails.billToZip}</li>
          <li>{orderDetails.email}</li>
          <li>&nbsp; </li>
          <li>Order shipped: {dateFormat(orderDetails.shipDate, "ddd, mmm d, yyyy")}</li>
          <li>&nbsp; </li>
          <li>UPS tracking number: <a href="https://track24.net/?code=EV938507560CN" target="_blank">{orderDetails.trackingNumber}</a></li>
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
      <iframe id="iframe"
        src="//track24.net/?code=EV938507560CN"
        width="100%"
        height="500"
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
    console.log('setting state to ', idx)
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
    console.log('clicked', data)
    const { selected } = data;
    const start = selected * this.state.pageCount;
    const res = this.state.allData.slice(start, start + this.state.pageCount)
    console.log('new data', res)
    this.setState(Object.assign({}, this.state, { data: res }))

    // read those rows from the server instead of an array

    //    let offset = Math.ceil(selected * this.props.perPage);
    // this.setState({ offset: offset }, () => {
    //   this.loadCommentsFromServer();
    // });
  };

  render() {

    if (!this.props.allOrders || this.props.allOrders.length === 0){

      return <h2>There are no orders in the system</h2>
    }
    return (
      <div>
        <div className="itemList-admin">
          <h2>{this.props.name}, your order status</h2>
          <br />
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
      </div>
      //original code backup
      // <div id="profilecontainer" className="flex-v-remover">
      //   <div id="profileleft" className="container">
      //     <div>
      //       <h2 className="profilehdr">Order Status</h2>
      //       <div className="profilehdr">
      //       </div>
      //     </div>
      //   </div>
      //   <div id="profileright" className="container">
      //     <div>
      //       <h2>{this.props.name}</h2>
      //       <br />
      //       <OrderList data={this.props.allOrders} handleDetailClick={this.handleDetailClick} offset={this.state.offset} pageCount={this.state.pageCount} />

      //       {this.state.totalOrders > this.state.pageCount &&
      //         <ReactPaginate
      //           previousLabel={'previous'}
      //           nextLabel={'next'}
      //           breakLabel={'...'}
      //           breakClassName={'break-me'}
      //           pageCount={this.state.pageCount}
      //           marginPagesDisplayed={2}
      //           pageRangeDisplayed={5}
      //           onPageChange={this.handlePageClick}
      //           containerClassName={'pagination'}
      //           previousLinkClassName={"pagination__link"}
      //           nextLinkClassName={"pagination__link"}
      //           disabledClassName={"pagination__link--disabled"}
      //           activeClassName={"pagination__link--active"}
      //         />
      //       }
      //       {this.state.showDetails !== null &&
      //         <OrderDetail orderDetails={this.props.allOrders[this.state.showDetails]} />
      //       }
      //     </div>
      //   </div>
      // </div>
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