const topRockSongs = [
   { artist: "Fleetwod Mac", title: "Dreams", sales_and_streams: 1882000 },
   { artist: "AJR", title: "Bang!", sales_and_streams: 1627000 },
   { artist: "Imagine Dragons", title: "Believer", sales_and_streams: 1571000 },
   { artist: "Journey", title: "Don't Stop Believin'", sales_and_streams: 1497000 },
   { artist: "Eagles", title: "Hotel California", sales_and_streams: 1393000 }
];

const topSongsSection = d3.select('#top-songs');

topSongsSection
   .append('h3')
      .text('Top Rock Songs');

const circlesChartWidth = 500;
const circlesChartHeight = 130;
const circlesChart = topSongsSection
   .append('svg')
      .attr('viewbox', [0, 0, circlesChartWidth, circlesChartHeight])
      .attr('width', circlesChartWidth)
      .attr('height', circlesChartHeight);

circlesChart
   .append('line')
      .attr('x1', 0)
      .attr('y1', circlesChartHeight/2)
      .attr('x2', circlesChartWidth)
      .attr('y2', circlesChartHeight/2)
      .attr('stroke', '#333')
      .attr('stroke-width', 2);

const circlesChartGroup = circlesChart.selectAll('g')
  .data(topRockSongs)
  .join('g')

const circlesScale = d3.scaleLinear()
   .domain([0, d3.max(topRockSongs, d => d.sales_and_streams)])
   .range([0, 4000]); // ranges of areas of circles

const circleWidth = circlesChartWidth / topRockSongs.length
circlesChartGroup.append('circle')
  .attr('cx', (d,i) => circleWidth/2 + (circleWidth * i))
  .attr('cy', circlesChartHeight / 2)
  .attr('r', d => Math.sqrt(circlesScale(d.sales_and_streams) / Math.PI))
  .attr('fill', 'steelblue')

circlesChartGroup.append('text')
   .attr('class', 'label label-songValue')
   .attr('x', (d, i) => circleWidth/2 + (circleWidth * i))
   .attr('y', 18)
   .attr('text-anchor', 'middle')
   .text(d => d.sales_and_streams / 1000000 + 'M');

circlesChartGroup.append('text')
  .attr('class', 'label label-songName')
  .attr('x', (d, i) => circleWidth/2 + (circleWidth * i))
  .attr('y', circlesChartHeight - 10)
  .attr('text-anchor', 'middle')
  .style('font-size', '12px')
  .text(d => d.title);

// barChart.selectAll('.label-album')
//  .data(topRockAlbums)
//  .join('text')
//     .attr('class', 'label label-songName')
//     .attr('x', marginLeft - 5)
//     .attr('y', (d, i) => (barMargin + (barThickness + barMargin) * i) + 14)
//     .attr('text-anchor', 'end')
//     .text(d => d.artist + ', ' + d.title);
