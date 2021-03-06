import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "ionic-angular";
import {RelatedInfoModal} from "../related-info-modal/related-info-modal";

// include d3 as it comes from the standard d3 js file
declare var d3: any;

@Component({
  selector: 'outlier-dm-chart',
  template: `<div class="chart"></div>`
})
export class OutlierDMChart implements OnInit {
  @Input() data: any;

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    let outlierDMChartInstance = this;
    let height: number = 400 * 1.5;
    let width: number = 500 * 1.5;
    let margin: number = 100 * 1.5;
    let labelX: string = 'YEAR';
    let labelY: string = 'MONEY';
    let svg: any = d3.select('.chart')
      .append('svg')
      .attr('class', 'chart')
      .attr("width", width + 2*margin)
      .attr("height", height + 2*margin)
      .append("g")
      .attr("transform", "translate(" + margin + "," + margin + ")");

    console.log(this.data);

    let x_data = this.data.map(function (d) { return d.x; });
    let years = x_data.filter(function(item, pos) {
      return x_data.indexOf(item) == pos;
    }).sort();
    years.splice(0, 0, 0); // add year 0 for rendering purposes

    let range_array = new Array(years.length);
    range_array[0] = 0;
    for (let i=1; i<range_array.length; i++) {
      range_array[i] = range_array[i-1] + width / (years.length - 1);
    }

    let x = d3.scale.ordinal()
      .domain(years)
      .range(range_array);

    let y = d3.scale.linear()
      .domain([
        d3.min(this.data, function (d) { return d.y; }),
        d3.max(this.data, function (d) { return d.y; })
      ])
      .range([height, 0]);

    let scale = d3.scale.sqrt()
      .domain([
        d3.min(this.data, function (d) { return d.size; }),
        d3.max(this.data, function (d) { return d.size; })
      ])
      .range([1, 40]);

    let opacity = d3.scale.sqrt()
      .domain([
        d3.min(this.data, function (d) { return d.size; }),
        d3.max(this.data, function (d) { return d.size; })
      ])
      .range([1, .5]);

    let xAxis = d3.svg.axis().scale(x);
    let yAxis = d3.svg.axis().scale(y).orient("left");

    // Define the div for the tooltip
    let div = d3.select("body").append("div")
      .attr("class", "extra")
      .style("opacity", 0);

    // y axis and label
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("x", 0)
      .attr("y", -margin + 120)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .text(labelY);

    // x axis and label
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("x", width + 100)
      .attr("y", margin - 130)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .text(labelX);

    let color = d3.scale.category10();
    let colors = {};
    this.data.forEach(function(d) {
      colors[d.color] = color(d.color);
    });

    let i = 0;
    for (let key in colors) {
      if (!colors.hasOwnProperty(key)) continue;
      i++;
      svg.append("text")
        .style("fill", colors[key])
        .style("font-weight", "bold")
        .style("font-size", "20px")
        .attr("x", width + 50)
        .attr("y", -50 + 20*i)
        .text(key);
    }

    svg.selectAll("circle")
      .data(this.data)
      .enter()
      .insert("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("opacity", function (d) { return opacity(d.size); })
      .attr("r", function (d) { return scale(d.size*3); })
      .style("fill", function (d) {return color(d.color);})
      .on('mouseover', function (d, i) {
        fade(d.color, .1);
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("<b><p>Year: " + d.x + "</p><p>Money: " + d.y + "</p><p>Budget Phase: " + d.color +
          "</p><p>Outlier Score: " + d.score_label + "</b>")
          .style("left", (d3.event.pageX + 20) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on('mouseout', function (d, i) {
        fadeOut();
        div.transition()
          .duration(200)
          .style("opacity", 0);
      })
      .on('click', function (d, i) {

        let replacerFunction = function (key, value) {
          if (key == 'x' || key == 'y' || key == 'color' || key == 'size' || key == 'Item') return undefined;
          return value;
        };

        let relatedInfoModal = outlierDMChartInstance
          .modalCtrl.create(RelatedInfoModal,
            {'modalString': JSON.stringify(d, replacerFunction, 4)});
        relatedInfoModal.present();
      })
      .transition()
      .attr("cx", function (d) { return x(d.x); })
      .attr("cy", function (d) { return y(d.y); });

    function fade(color, opacity) {
      svg.selectAll("circle")
        .filter(function (d) {
          return d.color != color;
        })
        .transition()
        .style("opacity", opacity);
    }

    function fadeOut() {
      svg.selectAll("circle")
        .transition()
        .style("opacity", function (d) { opacity(d.size); });
    }
  }
}
