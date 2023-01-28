import React, { Component } from 'react'

export class WhetherNews extends Component {
  render() {
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <div className="card bg-dark text-white" style={{ height: "230px", width: "300px" }}>
          
                 
            <div className="card-img-overlay" >
              <h1 className="card-title">{this.props.search}</h1>
              <p >{new Date().toLocaleTimeString()} pm</p>
              <p className="card-text  text-end">{this.props}°Cel</p>
              <p className="card-text  text-end"> H:{this.props} </p>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WhetherNews
