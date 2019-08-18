import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,  FunnelSeries, Inject, AccumulationTooltip, AccumulationDataLabel}
from'@syncfusion/ej2-react-charts';
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
            
            <AccumulationChartComponent onClick={this.show.bind(this)} id='funnel-chart' ref={funnel => this.funnel = funnel} title='' load={this.load.bind(this)} tooltip={{ enable: true, format: '${point.x} : <b>${point.y}</b>' }} resized={this.onChartResized.bind(this)} loaded={this.onChartLoad.bind(this)}>
              <Inject services={[FunnelSeries, AccumulationTooltip, AccumulationDataLabel]}/>
              <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective dataSource={this.props.data1} xName='x' yName='y' type='Funnel' width='40%' height='100%' neckWidth='15%' gapRatio={0.03} neckHeight='18%' explode={false} dataLabel={{
            name: 'text', visible: true, position: 'Outside', connectorStyle: { length: "6%" }
        }}>
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
    document.getElementById('funnel-chart').setAttribute('title', '');
}
onChartResized(args) {
  let bounds = document.getElementById('funnel-chart').getBoundingClientRect();
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