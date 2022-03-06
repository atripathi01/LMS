import React, { Component } from "react";
import Adver from '../images/homeimage.svg'

export default class Home extends Component {
  render() {
    return <div>Homepage
      <img src={Adver} alt="imgaaaaa" style={{"width":"500px ","height":"auto"}} />
    </div>;
  }
}
