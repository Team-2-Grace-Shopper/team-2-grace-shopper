import React from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

export class OrderList extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
//    console.log('***',this.props)
    const { data, offset, pageCount} = this.props;
    const thisPage = data.slice(offset, offset+pageCount)
    return (
      <div id="project-comments" className="commentList">
        <li>
          {thisPage.map((c,i) => <ul key={i}>Order #{i} - {c}</ul> )}
        </li>
      </div>      
    )
  }
}

class _OrderHistory extends React.Component {
  constructor(){
    super();

    this.state = {
      allData: [],
      data: [],
      offset: 0,
      pageCount:5
    }
  }

  async componentDidMount(){
    await this.getDataFromServer();
    this.setState(Object.assign({}, this.state, {data:this.state.allData.slice(0,this.state.pageCount)}))
    console.log('all data', this.state.allData)
  }

  getDataFromServer(){
    const res=[];
    for (let i=0;i < 32; i++){
      res[i] = Math.random()*32
    }
//    console.log('res', res)
    this.setState(Object.assign({}, this.state, {allData:res} ))
  }

  handlePageClick = (data) => {
    console.log('clicked', data)
    const { selected } = data;
    const start = selected * this.state.pageCount;
    const res = this.state.allData.slice(start, start + this.state.pageCount)
    console.log('new data', res)
    this.setState(Object.assign({}, this.state, {data: res} ))

    // read those rows from the server instead of an array

    //    let offset = Math.ceil(selected * this.props.perPage);
    // this.setState({ offset: offset }, () => {
    //   this.loadCommentsFromServer();
    // });
  };

  render() {
    return (
      <div id="orderhistory" className="commentBox">
        <OrderList data={this.state.data} offset={this.state.offset} pageCount={this.state.pageCount} />
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
      </div>
    );
  }
}

//const OrderHistory = connect(mapStateToProps, mapDispatchToProps)(_OrderHistory)
const OrderHistory = connect()(_OrderHistory)

export default OrderHistory;