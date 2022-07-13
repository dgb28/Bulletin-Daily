import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types';

export default class News extends Component {
    static defaultProps={
      country:'in',
      pageSize:8,
      category:"general"
    }
    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
    }
    constructor(){
        super();
        console.log("Hello I am a constructor for news component")
        this.state={
            articles:[],
            page:1,
            loading:true
        }
    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=506786fcb8384b3c913f8d5170d7389f&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data= await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData)
        this.setState({
          articles:parsedData.articles,
          totalResults:parsedData.totalResults,
          loading:false
        })
    }

    handleNextClick=async()=>{
      if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
      {
        console.log("next btn is clicked")
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=506786fcb8384b3c913f8d5170d7389f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data= await fetch(url);
            let parsedData=await data.json();
            this.setState({
                page:this.state.page + 1,
                articles:parsedData.articles,
                loading:false,
            })
            console.log(this.state.page)
      }
    }
    handlePreviousClick=async()=>{
        console.log("next btn is clicked")
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=506786fcb8384b3c913f8d5170d7389f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data= await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData)
        this.setState({
            page:this.state.page-1,
            articles:parsedData.articles,
            loading:false,
        })
        console.log(this.state.page)
    }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px'}}>Bulletin Daily - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div key={element.url} className="col-md-4">
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>          
        })}
        </div>
        <div className="container">
            <div className="d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePreviousClick}>&larr; Previous</button>
              <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
      </div>
    )
  }
}
