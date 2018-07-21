import React from 'react';
import { extent } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import {openIssues as data} from './dummData';
console.log(data);
export default class OpenIssues extends React.Component{
	createPath = ()=>{
		const selectX = (datum) => new Intl.DateTimeFormat('en-US').format(new Date(datum.date));
	 const 	selectY = (datum) => datum.count;

		//const xScale =
	}
	render(){


		return <svg
      className="container"
      height='30vh'
      width='50vw'
    >
	   
		 <g>
		  {this.createPath()}
		 </g>
		</svg>
	}
}
