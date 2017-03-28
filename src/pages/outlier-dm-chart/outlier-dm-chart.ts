import { Component, Input, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

@Component({
  selector: 'outlier-dm-chart',
  template: `<div *ngIf="dataArrived()" class="chart"></div>`
})
export class OutlierDMChart {
  svg: any;
  height: number = 400 * 1.5;
  width: number = 500 * 1.5;
  margin: number = 100 * 2;
  labelX: string = 'YEAR';
  labelY: string = 'MONEY';

  @Input() data: any;

  constructor() {}

  dataArrived () {
    let arrived = typeof this.data != 'undefined';
    if (arrived) {
      this.load();
    }
    return arrived;
  }

  load() {
    this.svg = d3.select('.chart')
      .append('svg')
      .attr('class', 'chart')
      .attr("width", this.width + 2*this.margin)
      .attr("height", this.height + 2*this.margin)
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    let x_data = this.data.map(function (d) { return d.x; });
    let years = x_data.filter(function(item, pos) {
      return x_data.indexOf(item) == pos;
    }).sort();

    let range_array = new Array(years.length);
    range_array[0] = 0;
    for (let i=1; i<range_array.length; i++) {
      range_array[i] = range_array[i-1] + this.width / (years.length - 1);
    }

    let x = d3Scale.scaleOrdinal()
      .domain(years)
      .range(range_array);

    let y = d3Scale.scaleLinear()
      .domain([d3Array.min(this.data, function (d) { return d.y; }), d3Array.max(this.data, function (d) { return d.y; })])
      .range([this.height, 0]);

    let scale = d3Scale.scaleSqrt()
      .domain([d3Array.min(this.data, function (d) { return d.size; }), d3Array.max(this.data, function (d) { return d.size; })])
      .range([1, 40]);

    let opacity = d3Scale.scaleSqrt()
      .domain([d3Array.min(this.data, function (d) { return d.size; }), d3Array.max(this.data, function (d) { return d.size; })])
      .range([1, .5]);

    let xAxis = d3Axis.axisBottom().scale(x);
    let yAxis = d3Axis.axisLeft().scale(y);//.orient("left");

    // Define the div for the tooltip
    let div = d3.select("body").append("div")
      .attr("class", "extra")
      .style("opacity", 0);

    // y axis and label
    this.svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("x", 0)
      .attr("y", -this.margin + 120)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .text(this.labelY);

    // x axis and label
    this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(xAxis)
      .append("text")
      .attr("x", this.width + 70)
      .attr("y", this.margin - 130)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .text(this.labelX);

    let colors = {};
    let i = 0;
    this.data.forEach(function(d) {
      console.log(d3Scale.schemeCategory10);
      colors[d.color] = d3Scale.schemeCategory10[i++];
    });

    i = 0;
    for (let key in colors) {
      if (!colors.hasOwnProperty(key)) continue;
      i++;
      this.svg.append("text")
        .style("fill", colors[key])
        .style("font-weight", "bold")
        .style("font-size", "20px")
        .attr("x", this.width + 50)
        .attr("y", -50 + 20*i)
        .text(key);
    }

    this.svg.selectAll("circle")
      .data(this.data)
      .enter()
      .insert("circle")
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .attr("opacity", function (d) { return opacity(d.size); })
      .attr("r", function (d) { return scale(d.size); })
      .style("fill", function (d) { return d3Scale.schemeCategory10(d.color); })
      .on("click", function(d, i) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("<b><p>Year: " + d.x + "</p><p>Money: " + d.y + "</p><p>Budget Phase: " + d.color + "</p><p>Outlier Score: " + d.size + "</b>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on('mouseover', function (d, i) {
        fade(d.color, .1);
      })
      .on('mouseout', function (d, i) {
        fadeOut();
      })
      .transition()
      .attr("cx", function (d) { return x(d.x); })
      .attr("cy", function (d) { return y(d.y); });

    function fade(color, opacity) {
      this.svg.selectAll("circle")
        .filter(function (d) {
          return d.color != color;
        })
        .transition()
        .style("opacity", opacity);
    }

    function fadeOut() {
      this.svg.selectAll("circle")
        .transition()
        .style("opacity", function (d) { opacity(d.size); });
    }
  }
}
