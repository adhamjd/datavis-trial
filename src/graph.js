import * as d3 from "d3";
import tip from "d3-tip";

export function createGraph(data) {
  const margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 90
  };
  const width = 1080 - margin.left - margin.right;
  const height = 720 - margin.top - margin.bottom;


  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "social-media-bar-chart")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  const tooltip = tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
      if (d3.select(this).classed('males')) {
        return "<strong>" + d["Social Media"] + "</strong><br>" +
          "Males: " + d.Males;
      } else {
        return "<strong>" + d["Social Media"] + "</strong><br>" +
          "Females: " + d.Females;
      }

    });

  // Call the tooltip
  svg.call(tooltip);

  const xScale = d3.scaleBand()
    .domain(data.map(d => d["Social Media"]))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Males + d.Females)])
    .range([height, 0]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  svg.append("g")
    .call(d3.axisLeft(yScale));


  // Draw bars for males
  svg.selectAll(".bar.males")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar males")
    .attr("x", d => xScale(d["Social Media"]))
    .attr("y", d => yScale(d.Males))
    .attr("width", xScale.bandwidth() / 2)
    .attr("height", d => height - yScale(d.Males))
    .attr("fill", "steelblue")

  // Draw bars for females
  svg.selectAll(".bar.females")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar females")
    .attr("x", d => xScale(d["Social Media"]) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.Females))
    .attr("width", xScale.bandwidth() / 2)
    .attr("height", d => height - yScale(d.Females))
    .attr("fill", "pink")


  // Add X axis label
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.35em")
    .text("Social Media Platform");

  // Add Y axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left)
    .attr("dy", "2em")
    .attr("text-anchor", "middle")
    .attr("font-size", "1.35em")
    .text("Number of People");

  // // Add id attribute to each row in the table
  const tableRows = document.querySelectorAll("table tr:not(:first-child)");
  tableRows.forEach((row) => {
    const socialMedia = row.dataset.socialMedia;
    row.id = `row-${socialMedia.toLowerCase().replace(" ", "-")}`;

    //  // The facebook row was returning null could be a d3 issue. so i had to use a seperate row Id for facebook
    const facebookRow = document.querySelector('[data-social-media="Facebook"]');
    facebookRow.id = 'row-facebook';
  });

  // Add event listeners to the bars
  svg.selectAll(".bar")
    .on("mouseover", function(d) {
      // Get the name of the social media platform from the data
      const socialMedia = d["Social Media"].toLowerCase().replace(" ", "-");

      

      

      // Highlight the corresponding row in the table
      const row = document.getElementById(`row-${socialMedia}`);
      row.classList.add("highlighted");

    })
    .on("mouseout", function(d) {
      // Get the name of the social media platform from the data
      const socialMedia = d["Social Media"].toLowerCase().replace(" ", "-");

      

      // Remove the highlight from the corresponding row in the table
      const row = document.getElementById(`row-${socialMedia}`);
      row.classList.remove("highlighted");
    });

  svg.selectAll(".bar")
    .on("click", tooltip.show)


    const legend = svg.append("g")
  .attr("class", "legend")
  .attr("transform", "translate(" + (width - 100) + ", 0)");

// Append a rectangle for the male bars
legend.append("rect")
  .attr("x", 0)
  .attr("y", 10)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", "steelblue");

// Append a rectangle for the female bars
legend.append("rect")
  .attr("x", 0)
  .attr("y", 30)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", "pink");

// Append text for the male bars
legend.append("text")
  .attr("x", 20)
  .attr("y", 20)
  .text("Males")
  .attr("text-anchor", "left")
  .style("font-size", "12px")
  .attr("alignment-baseline","middle");

// Append text for the female bars
legend.append("text")
  .attr("x", 20)
  .attr("y", 40)
  .text("Females")
  .attr("text-anchor", "left")
  .style("font-size", "12px")
  .attr("alignment-baseline","middle");

    
    
    

}
