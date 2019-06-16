import React, { Component } from "react";

//import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'

class Products extends React.Component {
  constructor(props) {
    super(props);

    //  this.state.products = [];
    this.state = {
      date: "16-06-2019",
      filterText: "hello",
      products: [
        {
          id: 1,
          category: "",
          price: "",
          qty: "",
          name: ""
        },
        {
          id: 2,
          category: "",
          price: "",
          qty: "",
          name: ""
        },
        {
          id: 3,
          category: "",
          price: "",
          qty: "",
          name: ""
        }
      ]
    };
  }
  getDate() {
    var sp = "/";
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    let date = mm + sp + dd + sp + yyyy;
    console.log(date);
    this.setState({
      date: date
    });
  }
  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  }

  handleAddEvent(evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      name: "",
      price: "",
      category: "",
      qty: 0
    };
    this.state.products.push(product);
    this.setState(this.state.products);
  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var products = this.state.products.slice();
    var newProducts = products.map(function(product) {
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });
    this.setState({ products: newProducts });
    //  console.log(this.state.products);
  }
  render() {
    return (
      <div>
        <ProductTable
          onProductTableUpdate={this.handleProductTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          products={this.state.products}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    //  this.state.products = [];
    this.state = {
      date: "16-06-2019",
      filterText: "hello",
      
    };
  }
  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function(product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (
        <ProductRow
          onProductTableUpdate={onProductTableUpdate}
          product={product}
          onDelEvent={rowDel.bind(this)}
          key={product.id}
        />
      );
    });
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>
                {" "}
                <div class="date">{this.state.date}</div>
              </th>
              <th>price</th>
              <th>quantity</th>
              <th>category</th>
            </tr>
          </thead>

          <tbody>{product}</tbody>
        </table>
      </div>
    );
  }
}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);
  }
  render() {
    return (
      <tr className="eachRow">
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "name",
            value: this.props.product.name,
            id: this.props.product.id
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "price",
            value: this.props.product.price,
            id: this.props.product.id
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "qty",
            value: this.props.product.qty,
            id: this.props.product.id
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "category",
            value: this.props.product.category,
            id: this.props.product.id
          }}
        />
      </tr>
    );
  }
}
class EditableCell extends React.Component {
  render() {
    return (
      <td>
        <input
          type="text"
          name={this.props.cellData.type}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          onChange={this.props.onProductTableUpdate}
        />
      </td>
    );
  }
}
export default Products;
