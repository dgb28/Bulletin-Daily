import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl}=this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={imageUrl!==null?imageUrl:"https://english.cdn.zeenews.com/sites/default/files/2022/07/06/1061719-covid19-virus-pixabay.jpg"} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
