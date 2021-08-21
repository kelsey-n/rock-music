const metrics = ['total_album_consumption_millions', 'album_sales_millions', 'song_sales', 'on_demand_audio_streams_millions', 'on_demand_video_streams_millions'];
const artists = [];

d3.csv('../data/top_albums.csv').then(data => {
  data.forEach(datum => {
     metrics.forEach(metric => {
        datum[metric] = parseFloat(datum[metric]); // Convert strings to numbers
     });
     artists.push(datum.artist); // Populate the artists array
  });

  createBubbleChart(data);
  console.log(data)
});

function createBubbleChart(data) {
  const margin = {top: 40, right: 0, bottom: 60, left: 40};
  const width = 1160;
  const height = 380;

  const bubbleChart = d3.select('#bubble-chart')
    .append('svg')
      .attr('viewbox', [0, 0, width, height])
      .attr('width', width)
      .attr('height', height);

  // x axis scale
  const audioStreamsScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.on_demand_audio_streams_millions) + 500])
    .range([margin.left, width - margin.left - margin.right]);
  // add x axis
  bubbleChart
   .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom - margin.top})`)
      .call(d3.axisBottom(audioStreamsScale));
  // add label to x axis
  bubbleChart
    .append('text')
      .attr('class', 'label axis-label')
      .attr('x', width)
      .attr('y', height - margin.bottom + 10)
      .attr('text-anchor', 'end')
      .text('On-demand Audio Streams (millions)');

  // repeat for y axis
  const videoStreamsScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.on_demand_video_streams_millions + 300)])
    .range([height - margin.bottom - margin.top, margin.bottom]);
  bubbleChart
   .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(videoStreamsScale));
  bubbleChart
    .append('text')
      .attr('class', 'label axis-label')
      .attr('x', 0)
      .attr('y', margin.top)
      .text('On-demand Video Streams (millions)');

  const radiusMax = 20
  const bubblesAreaScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.album_sales_millions)])
    .range([0, Math.PI * Math.pow(radiusMax, 2)]);

  const colorScale = d3.scaleOrdinal()
    .domain(artists)
    .range(d3.schemeTableau10);

   const circlesChartGroup = bubbleChart.append('g')
     .selectAll('.circle-group')
     .data(data)
     .join('circle')
       .attr('class', 'circle-group')
       .attr('cx', d => audioStreamsScale(d.on_demand_audio_streams_millions))
       .attr('cy', d => videoStreamsScale(d.on_demand_video_streams_millions))
       .attr('r', d => Math.sqrt(bubblesAreaScale(d.album_sales_millions) / Math.PI))
       .attr('fill', d => colorScale(d.artist))

   // Append color legend
   const colorLegend = d3.select('.legend-color')
     .append('ul')
     .selectAll('.bubble-color-legend-item')
     .data(data)
     .join('li')
       .attr('class', 'bubble-color-legend-item');
   colorLegend
     .append('span')
       .attr('class', 'legend-circle')
       .style('background-color', (d, i) => colorScale(d.artist));
   colorLegend
     .append('span')
       .attr('class', 'legend-label')
       .text(d => d.artist);

   // Append area legend
   const areaLegendCircles = d3.select('.legend-area')
     .append('svg')
       .attr('viewbox', [0, 0, 150, 100])
       .attr('width', 150)
       .attr('height', 100);

   const circlesGroup = areaLegendCircles // I chose to create a group for the circles. This is not mandatory but can help keep the markup organized
     .append('g')
       .attr('class', 'circles-group')
       .attr('fill', '#727a87') // Since I used a group, I can apply the circles styles to the group instead of repeting them for each circle
       .attr('fill-opacity', 0.4); // These styles could also be applied from the CSS stylesheet!
   circlesGroup
     .append('circle')
       .attr('cx', Math.sqrt(bubblesAreaScale(1.5) / Math.PI))
       .attr('cy', Math.sqrt(bubblesAreaScale(1.5) / Math.PI) + 5)
       .attr('r', Math.sqrt(bubblesAreaScale(1.5) / Math.PI));
   circlesGroup
     .append('circle')
       .attr('cx', Math.sqrt(bubblesAreaScale(1.5) / Math.PI))
       .attr('cy', 2 * Math.sqrt(bubblesAreaScale(1.5) / Math.PI) - Math.sqrt(bubblesAreaScale(0.5) / Math.PI) + 5)
       .attr('r', Math.sqrt(bubblesAreaScale(0.5) / Math.PI));
   circlesGroup
     .append('circle')
       .attr('cx', Math.sqrt(bubblesAreaScale(1.5) / Math.PI))
       .attr('cy', 2 * Math.sqrt(bubblesAreaScale(1.5) / Math.PI) - Math.sqrt(bubblesAreaScale(0.1) / Math.PI) + 5)
       .attr('r', Math.sqrt(bubblesAreaScale(0.1) / Math.PI));

   const linesGroup = areaLegendCircles
     .append('g')
       .attr('class', 'lines-group')
       .attr('stroke', '#333') // Same here, I can apply the lines styles to the group instead of repeating them for each line
       .attr('stroke-dasharray', '6 4');
   linesGroup
     .append('line')
       .attr('x1',  Math.sqrt(bubblesAreaScale(1.5) / Math.PI))
       .attr('y1', 5)
       .attr('x2',  Math.sqrt(bubblesAreaScale(1.5) / Math.PI) + 60)
       .attr('y2', 5);
   linesGroup
     .append('line')
       .attr('x1',  Math.sqrt(bubblesAreaScale(1.5) / Math.PI))
       .attr('y1', 2 * Math.sqrt(bubblesAreaScale(1.5) / Math.PI) - 2 * Math.sqrt(bubblesAreaScale(0.5) / Math.PI) + 5)
       .attr('x2',  Math.sqrt(bubblesAreaScale(1.5) / Math.PI) + 60)
       .attr('y2', 2 * Math.sqrt(bubblesAreaScale(1.5) / Math.PI) - 2 * Math.sqrt(bubblesAreaScale(0.5) / Math.PI) + 5);
   linesGroup
     .append('line')
       .attr('x1',  Math.sqrt(bubblesAreaScale(1.5) / Math.PI))
       .attr('y1', 2 * Math.sqrt(bubblesAreaScale(1.5) / Math.PI) - 2 * Math.sqrt(bubblesAreaScale(0.1) / Math.PI) + 5)
       .attr('x2',  Math.sqrt(bubblesAreaScale(1.5) / Math.PI) + 60)
       .attr('y2', 2 * Math.sqrt(bubblesAreaScale(1.5) / Math.PI) - 2 * Math.sqrt(bubblesAreaScale(0.1) / Math.PI) + 5);

   const labelsGroup = areaLegendCircles
     .append('g')
       .attr('class', 'labels-group')
       .attr('fill', '#333');
   labelsGroup
     .append('text')
       .attr('class', 'label')
       .attr('x',  Math.sqrt(bubblesAreaScale(1.5) / Math.PI) + 70)
       .attr('y', 10)
       .text('1.5M');
   labelsGroup
     .append('text')
       .attr('class', 'label')
       .attr('x',  Math.sqrt(bubblesAreaScale(1.5) / Math.PI) + 70)
       .attr('y', 2 * Math.sqrt(bubblesAreaScale(1.5) / Math.PI) - 2 * Math.sqrt(bubblesAreaScale(0.5) / Math.PI) + 10)
       .text('0.5M');
   labelsGroup
     .append('text')
       .attr('class', 'label')
       .attr('x',  Math.sqrt(bubblesAreaScale(1.5) / Math.PI) + 70)
       .attr('y', 2 * Math.sqrt(bubblesAreaScale(1.5) / Math.PI) - 2 * Math.sqrt(bubblesAreaScale(0.1) / Math.PI) + 10)
       .text('0.1M');

}
