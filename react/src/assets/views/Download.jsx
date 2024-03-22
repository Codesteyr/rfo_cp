import React, { Component } from "react";

class Download extends Component {
  render() {
    return (
      <div className="container">
        <div className="download--navigation ">
          <div className="download-client fadeinleft">
            <div className="client-title">
              <p>СКАЧАТЬ ГОТОВЫЙ КЛИЕНТ</p>
            </div>
            <div className="client-image"></div>
            <div className="download-button">
              <button className="blick">
                <h2>СКАЧАТЬ</h2>
              </button>
            </div>
          </div>
          <div className="download-launcher fadeinright">
            <div className="client-title">
              <p>СКАЧАТЬ ЛАУНЧЕР</p>
            </div>
            <div className="client-image--launcher"></div>
            <div className="download-button">
              <button className="blick">
                <h2>СКАЧАТЬ</h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Download;
