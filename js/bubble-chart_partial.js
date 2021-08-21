// Import data
d3.csv('PATH_TO_DATA').then(data => {
  // Call the function that will build the chart.
  // Pass the data to that function.
});

// Create and append the chart
const createBubbleChart = (DATASET) => {
  const metrics = ['total_album_consumption_millions', 'album_sales_millions', 'song_sales', 'on_demand_audio_streams_millions', 'on_demand_video_streams_millions'];
  const artists = [];

  // Format the data
    // Convert metrics strings to numbers
    // Push each artist name to the artists array

  // Set the dimensions for the chart
  const margin = {top: 40, right: 0, bottom: 60, left: 40};
  const width = 1160;
  const height = 380;

  // Append svg
  const bubbleChart = d3.select('SELECTOR')
    .append('svg')
      .attr('viewbox', VALUE)
      .attr('width', VALUE)
      .attr('height', VALUE);

  // Create and append X axis - On demand audio streams
  const audioStreamsScale = d3.scaleLinear()
    .domain([MIN_VALUE, MAX_VALUE])
    .range([MIN_VALUE, MAX_VALUE]);
  bubbleChart
    .append('g')
      .attr('transform', POSITION THE X AXIS)
      .call(CALL THE D3 AXIS FUNCTION AND PASS THE RELATED SCALE AS A PARAMETER);
  bubbleChart
    .append('text')
      .attr('text-anchor', VALUE)
      .attr('x', VALUE)
      .attr('y', VALUE)
      .text('TEXT LABEL')
      .style('font-weight', 700);

  // Create and append Y axis - On demand video streams
  const videoStreamsScale = d3.scaleLinear()
    .domain([MIN_VALUE, MAX_VALUE])
    .range([MIN_VALUE, MAX_VALUE]);
  bubbleChart
    .append('g')
      .attr('transform', POSITION THE Y AXIS)
      .call(CALL THE D3 AXIS FUNCTION AND PASS THE RELATED SCALE AS A PARAMETER);
  bubbleChart
    .append('text')
      .attr('text-anchor', CALL THE D3 AXIS FUNCTION AND PASS THE RELATED SCALE AS A PARAMETER)
      .attr('x', VALUE)
      .attr('y', VALUE)
      .text('TEXT LABEL')
      .style('font-weight', 700);

  // Create scales for the size and color of the bubbles
  const bubblesAreaScale = d3.scaleLinear()
    .domain([MIN_VALUE, MAX_VALUE])
    .range([MIN_VALUE, MAX_VALUE]);
  const colorScale = d3.scaleOrdinal()
    .domain(ARTISTS_ARRAY)
    .range(D3 COLOR SCALE);
  // Bind data to the circles and position them on the chart
  bubbleChart
    .append('g')
      .attr('class', 'bubbles-group')
    .selectAll('SELECTOR')
    .data(DATASET)
    .join(WHAT DO WE WANT TO APPEND?)
      .attr('cx', d => CALCULATE THE X POSITION)
      .attr('cy', d => CALCULATE THE Y POSITION)
      .attr('r', d => CALCULATE THE RADIUS)
      .attr('fill', d => GET THE COLOR FROM THE COLOR SCALE);

  // Append color legend
  const colorLegend = d3.select('SELECTOR')
    .append('ul')
    .selectAll('SELECTOR)
    .data(DATASET)
    .join(WHAT DO WE WANT TO APPEND?)
      .attr('class', 'CLASSNAME');
  colorLegend
    .append('span')
      .attr('class', 'legend-circle')
      .style('background-color', (d, i) => GET THE COLOR FROM THE COLOR SCALE);
  colorLegend
    .append('span')
      .attr('class', 'legend-label')
      .text(d => TEXT LABEL);

  // Append area legend
  const areaLegendCircles = d3.select('SELECTOR')
    .append('svg')
      .attr('viewbox', VALUE)
      .attr('width', VALUE)
      .attr('height', VALUE);

  const circlesGroup = areaLegendCircles // I chose to create a group for the circles. This is not mandatory but can help keep the markup organized
    .append('g')
      .attr('class', 'circles-group')
      .attr('fill', '#727a87') // Since I used a group, I can apply the circles styles to the group instead of repeting them for each circle
      .attr('fill-opacity', 0.4); // These styles could also be applied from the CSS stylesheet!
  circlesGroup
    .append('circle')
      .attr('cx', CALCULATE X POSITION)
      .attr('cy', CALCULATE Y POSITION)
      .attr('r', CALCULATE RADIUS);
  circlesGroup
    .append('circle')
      .attr('cx', CALCULATE X POSITION)
      .attr('cy', CALCULATE Y POSITION)
      .attr('r', CALCULATE RADIUS);
  circlesGroup
    .append('circle')
      .attr('cx', CALCULATE X POSITION)
      .attr('cy', CALCULATE Y POSITION)
      .attr('r', CALCULATE RADIUS);

  const linesGroup = areaLegendCircles
    .append('g')
      .attr('class', 'lines-group')
      .attr('stroke', '#333') // Same here, I can apply the lines styles to the group instead of repeating them for each line
      .attr('stroke-dasharray', '6 4');
  linesGroup
    .append('line')
      .attr('x1',  CALCULATE X1 POSITION)
      .attr('y1', CALCULATE Y1 POSITION)
      .attr('x2',  CALCULATE X2 POSITION)
      .attr('y2', CALCULATE Y2 POSITION);
  linesGroup
    .append('line')
      .attr('x1',  CALCULATE X1 POSITION)
      .attr('y1', CALCULATE Y1 POSITION)
      .attr('x2',  CALCULATE X2 POSITION)
      .attr('y2', CALCULATE Y2 POSITION);
  linesGroup
    .append('line')
      .attr('x1',  CALCULATE X1 POSITION)
      .attr('y1', CALCULATE Y1 POSITION)
      .attr('x2',  CALCULATE X2 POSITION)
      .attr('y2', CALCULATE Y2 POSITION);
  
  const labelsGroup = areaLegendCircles
    .append('g')
      .attr('class', 'labels-group')
      .attr('fill', '#333');
  labelsGroup
    .append('text')
      .attr('class', 'label')
      .attr('x',  CALCULATE X POSITION)
      .attr('y', CALCULATE Y POSITION)
      .text('LABEL');
  labelsGroup
    .append('text')
      .attr('class', 'label')
      .attr('x',  CALCULATE X POSITION)
      .attr('y', CALCULATE Y POSITION)
      .text('LABEL');
  labelsGroup
    .append('text')
      .attr('class', 'label')
      .attr('x',  CALCULATE X POSITION)
      .attr('y', CALCULATE Y POSITION)
      .text('LABEL');
};