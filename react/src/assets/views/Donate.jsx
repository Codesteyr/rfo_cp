import React, { Component } from "react";

class Donate extends Component {
  render() {
    return (
      <div className="container">
        <div className="donate-board ">
          <div className="donate fadeinup">
            <div className="donate-input ">
              <input type="1000Р" name="" id="" />
            </div>
            <div className="donate-button">
              <button>
                <h2>ПОЖЕРТВОВАТЬ</h2>
              </button>
            </div>
          </div>
          <div className="donate-down--board fadeindown">
            <div className="donate-history ">
              <div className="donate--title">
                <p>ИСТОРИЯ ПОЖЕРТВОВАНИЙ</p>
              </div>
              <div className="donate-history--board "></div>
            </div>
            <div className="donate-shop">
              <div className="donate--title"></div>
              <div className="donate-history--board"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Donate;
