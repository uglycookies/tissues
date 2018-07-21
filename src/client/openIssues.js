import React from 'react';
import { extent } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import { line as d3Line } from 'd3-shape';
import {
  axisBottom as d3AxisBottom,
  axisLeft as d3AxisLeft,
} from 'd3-axis';

console.log('d3AxisBottomm',d3AxisBottom);
import { select as d3Select } from 'd3-selection';

import {openIssues as data} from './dummData';
console.log(data);
export default class OpenIssues extends React.Component{
	constructor(props){
		super();
		this.state={
			marginLeft:20,
			marginRight:20,
			marginTop:20,
			marginBottom:20
		};
		this.state.width = 250 - this.state.marginLeft - this.state.marginRight;
		this.state.height = 250 - this.state.marginTop - this.state.marginBottom;
	}


	createPath = ()=>{
		const selectX = (datum) => new Date(datum.date);
		const xScale = d3ScaleTime().domain(extent(data,selectX)).range([0,this.state.width]);

		const 	selectY = (datum) => datum.count;
		const yScale = d3ScaleLinear().domain(extent(data, selectY)).range([this.state.height,0]);
		const selectScaledX = (datum)=> {
				console.log('selectX ', selectX(datum))
				console.log('xScale ', xScale(selectX(datum)));
			  return xScale(selectX(datum))
		};
		const selectScaledY = (datum)=> {
			console.log('selectY ', selectY(datum));
			console.log('yScale ', yScale(selectY(datum)));
			return yScale(selectY(datum))
		};

		const line = d3Line()
			.x(selectScaledX)
			.y(selectScaledY);

		console.log('line',line);
		const linePath = line(data);
		console.log(linePath, line)
		return linePath;
	}

	createXAxis = () =>{
		const selectX = (datum) => new Date(datum.date);
		const xScale = d3ScaleTime().domain(extent(data,selectX)).range([0,this.state.width]);
		const xAxis = d3AxisBottom().scale(xScale).ticks(data.length);
		console.log('xAxis', xAxis)
		return xAxis;
	}
	createYAxis = () =>{
	 const 	selectY = (datum) => datum.count;
	 const yScale = d3ScaleLinear().domain(extent(data, selectY)).range([this.state.height,0]);
	 const yAxis = d3AxisLeft()
	 	.scale(yScale)
		.ticks(10);
		return yAxis;
	}
	render(){
		let {height,width,marginLeft,marginRight,marginTop,marginBottom} = this.state;
		return <svg
      className="container"
			height={height}
			width={width}
			transform={`translate(${marginLeft},${marginTop})`}
    >
		<g className="xAxis"   ref={node=>d3Select(node).call(this.createXAxis())} />
		<g className='yAxis'   ref={node=>d3Select(node).call(this.createYAxis())} />

		 <g width={(this.state.width-50).toString()} height={(this.state.height-50).toString()}>
		  <path d={this.createPath()} />
		 </g>
		</svg>
	}
}
