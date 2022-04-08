import React from 'react';
import {View, Dimensions} from 'react-native'
import Plotly from 'react-native-plotly';

import {darkGrey, light, lightGrey} from "../Global"

/*
  Return: A graph component
  Props: 
    data - data displayed on the screen
    showlegend - should the legend be shown
*/
function Graph ({data, showlegend}) {
  
  const update = (_, { data, layout, config }, plotly) => {
    plotly.react(data, layout, config);
  };

  return (
    <View style={{height:450}}>
      <Plotly
        data={data}
        layout={{  
          autosize: false,
          margin: {l: 10, r: 5, b: 10, t: 10, pad: 0},
          width:Dimensions.get('window').width,
          height:450,
          yaxis: {
            title: 'Distance', 
            automargin: true, 
            titlefont: {size:20, color: darkGrey}
          },
          xaxis: {
            title: 'Date', 
            automargin: true, 
            titlefont: {size:20, color: darkGrey, font:'bold'}, 
            tickformat: '%B %d \n %Y'
          },
          paper_bgcolor: light,
          plot_bgcolor: lightGrey,
          showlegend: showlegend,
          legend:{
            "orientation": "h", 
            x: 1, 
            xanchor: 'right', 
            y: 30, 
            font: {size: 12, color: darkGrey}
          }
        }}
        config = {{displayModeBar: false}}
        update={update}
        enableFullPlotly
      />
    </View>
  );
}
export default Graph;