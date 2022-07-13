import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  Routes,
  Route,
} from "react-router-dom";
import PageNotFound from './components/PageNotFound';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<News pageSize={5} country="in" category="general"/>}/>
          <Route path="business" element={<News pageSize={5} country="in" category="business"/>}/>
          <Route path="technology" element={<News pageSize={5} country="in" category="technology"/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </div>
    )
  }
}