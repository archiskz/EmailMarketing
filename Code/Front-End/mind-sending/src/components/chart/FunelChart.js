import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,  FunnelSeries, Inject,AccumulationLegend, AccumulationTooltip, AccumulationDataLabel}
from '@syncfusion/ej2-react-charts';
import axios from 'axios';
class FunelChart extends Component {

  

    constructor(props) {
        super(props);

        this.state = {
            data1:this.props.data1
        };
    }

        show=(args)=>{
            console.log(args)
        }
    render() {
        return (
            
            <AccumulationChartComponent id='chart' legendSettings={{ visible: false }} tooltip={{ enable: true, format: '${point.x} : <b>${point.y}</b>' }} title={this.props.title} resized={this.onChartResized.bind(this)} load={this.onLoad.bind(this)}>
      <Inject services={[AccumulationLegend, FunnelSeries, AccumulationTooltip, AccumulationDataLabel]}/>
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective dataSource={this.props.data1} xName='x' yName='y' type='Funnel' name='' dataLabel={{
            visible: true, position: 'Outside',
            connectorStyle: { length: '6%' }, name: 'text',
        }} explode="false">
        </AccumulationSeriesDirective>
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
        );
    }
    load(args) {
      console.log(args)
      // let selectedTheme = location.hash.split('/')[1];
     let selectedTheme = 'Material'
      args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
      if (args.accumulation.availableSize.width < args.accumulation.availableSize.height) {
          args.accumulation.series[0].width = '80%';
          args.accumulation.series[0].height = '70%';
      }
  }
  onChartLoad(args) {
    document.getElementById('chart').setAttribute('title', '');
}
onLoad(args) {
        if (args.accumulation.availableSize.width < args.accumulation.availableSize.height) {
            args.accumulation.series[0].width = '80%';
            args.accumulation.series[0].height = '70%';
        }
    }
onChartResized(args) {
  let bounds = document.getElementById('chart').getBoundingClientRect();
  if (bounds.width < bounds.height) {
      args.accumulation.series[0].width = '80%';
      args.accumulation.series[0].height = '70%';
  }
  else {
      args.accumulation.series[0].width = '60%';
      args.accumulation.series[0].height = '80%';
  }
}
}
export default FunelChart;