d3.csv('driving.csv', d3.autoType)
    .then(data=>{
        driving = data
        console.log(driving);

        const margin = {top: 20, right: 20, bottom: 20, left: 40},
            width = 700 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const svg = d3.select(".chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");

        const xScale = d3.scaleLinear()
            .domain(d3.extent(driving, d => d.miles)).nice()
            .range([margin.left, width - margin.right])
        
        const yScale = d3.scaleLinear()
            .domain(d3.extent(driving, d => d.gas)).nice()
            .range([height - margin.bottom, margin.top])

        const xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(10, ",f")

        const yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(10, "$.2f")
            
        svg.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)
            .call(g => g.select(".domain").remove())
            .selectAll(".tick line")
            .clone()
            .attr("y2", -height)
            .attr("stroke-opacity", 0.2); 

        svg.append("g")
            .attr("class", "axis y-axis")
            .attr("transform", `translate(35, 20)`)
            .call(yAxis)
            .call(g => g.select(".domain").remove())
            .selectAll(".tick line")
            .clone()
            .attr("x2", width)
            .attr("stroke-opacity", 0.2); 

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width-16)
            .attr("y", height-7)
            .text("Miles per Person per Year");

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 23)
            .attr("x", 150)
            .attr("dy", ".75em")
            .text("Cost per Gallon");

        svg.append("g")
            .attr("fill", "#48C9B0")
            .attr("stroke", "grey")
            .attr("stroke-width", 1)
            .selectAll("circle")
            .data(driving)
            .join("circle")
            .attr("fill","Cyan")
            .attr("cx", d => xScale(d.miles))
            .attr("cy", d => yScale(d.gas))
            .attr("r", 4);

        function position(d) {
            const t = d3.select(this);
            switch (d.side) {
                case "top":
                t.attr("text-anchor", "middle").attr("dy", "-0.7em");
                break;
                case "right":
                t.attr("dx", "0.5em")
                    .attr("dy", "0.32em")
                    .attr("text-anchor", "start");
                break;
                case "bottom":
                t.attr("text-anchor", "middle").attr("dy", "1.4em");
                break;
                case "left":
                t.attr("dx", "-0.5em")
                    .attr("dy", "0.32em")
                    .attr("text-anchor", "end");
                break;
            }
        }

        function halo(text) {
            text
              .select(function() {
                return this.parentNode.insertBefore(this.cloneNode(true), this);
              })
              .attr("fill", "none")
              .attr("stroke", "white")
              .attr("stroke-width", 4)
              .attr("stroke-linejoin", "round");
          }

        const line = d3
            .line()
            .curve(d3.curveCatmullRom)
            .x(d=>xScale(d.miles))
            .y(d=>yScale(d.gas));

        const l = line(data).length;

        svg.append("path")
            .datum(driving)
            .attr("fill", "none")
            .attr("stroke", "#A6ACAF")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-dasharray", `0,${l}`)
            .attr("d", line)
            .transition()
            .duration(15000)
            .ease(d3.easeLinear)
            .attr("stroke-dasharray", `${l},${l}`);
            


        const label = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("g")
            .data(driving)
            .join("g")
            .attr("transform", d => `translate(${xScale(d.miles)},${yScale(d.gas)})`)
            .attr("opacity", 0);
    
        label.append("text")
            .text(d => d.year)
            .each(position)
            .call(halo);
    
        label.transition()
            .delay((d, i) => line(data.slice(0, i + 1)).length / l * (5000 - 125))
            .attr("opacity", 1);


    })


function build(){
    d3.selectAll("svg").remove();
    d3.csv('driving.csv', d3.autoType)
    .then(data=>{
        driving = data
        console.log(driving);

        const margin = {top: 20, right: 20, bottom: 20, left: 40},
            width = 700 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;


        const svg = d3.select(".chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");

        const xScale = d3.scaleLinear()
            .domain(d3.extent(driving, d => d.miles)).nice()
            .range([margin.left, width - margin.right])
        
        const yScale = d3.scaleLinear()
            .domain(d3.extent(driving, d => d.gas)).nice()
            .range([height - margin.bottom, margin.top])


        const xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(10, ",f")

        const yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(10, "$0.2f")
            
        
        svg.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)
            .call(g => g.select(".domain").remove())
            .selectAll(".tick line")
            .clone()
            .attr("y2", -height)
            .attr("stroke-opacity", 0.2); 

        svg.append("g")
            .attr("class", "axis y-axis")
            .attr("transform", `translate(35, 20)`)
            .call(yAxis)
            .call(g => g.select(".domain").remove())
            .selectAll(".tick line")
            .clone()
            .attr("x2", width)
            .attr("stroke-opacity", 0.2); 


        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width-15)
            .attr("y", height-6)
            .text("Miles per Person per Year");

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 25)
            .attr("x", 145)
            .attr("dy", ".75em")
            .text("Cost per Gallon");

    

        svg.append("g")
            .attr("fill", "#48C9B0")
            .attr("stroke", "grey")
            .attr("stroke-width", 1)
            .selectAll("circle")
            .data(driving)
            .join("circle")
            .attr("cx", d => xScale(d.miles))
            .attr("cy", d => yScale(d.gas))
            .attr("fill","Cyan")
            .attr("r", 4);
        

        function position(d) {
            const t = d3.select(this);
            switch (d.side) {
                case "top":
                t.attr("text-anchor", "middle").attr("dy", "-0.7em");
                break;
                case "right":
                t.attr("dx", "0.5em")
                    .attr("dy", "0.32em")
                    .attr("text-anchor", "start");
                break;
                case "bottom":
                t.attr("text-anchor", "middle").attr("dy", "1.4em");
                break;
                case "left":
                t.attr("dx", "-0.5em")
                    .attr("dy", "0.32em")
                    .attr("text-anchor", "end");
                break;
            }
        }

        function halo(text) {
            text
              .select(function() {
                return this.parentNode.insertBefore(this.cloneNode(true), this);
              })
              .attr("fill", "none")
              .attr("stroke", "white")
              .attr("stroke-width", 4)
              .attr("stroke-linejoin", "round");
          }

        const line = d3
            .line()
            .curve(d3.curveCatmullRom)
            .x(d=>xScale(d.miles))
            .y(d=>yScale(d.gas));

        const l = line(data).length;

        svg.append("path")
            .datum(driving)
            .attr("fill", "none")
            .attr("stroke", "#A6ACAF")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-dasharray", `0,${l}`)
            .attr("d", line)
            .transition()
            .duration(15000)
            .ease(d3.easeLinear)
            .attr("stroke-dasharray", `${l},${l}`);
            
        const label = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 9)
            .selectAll("g")
            .data(driving)
            .join("g")
            .attr("transform", d => `translate(${xScale(d.miles)},${yScale(d.gas)})`)
            .attr("opacity", 0);
    
        label.append("text")
            .text(d => d.year)
            .each(position)
            .call(halo);
    
        label.transition()
            .delay((d, i) => line(data.slice(0, i + 1)).length / l * (5000 - 115))
            .attr("opacity", 1);
    })
}