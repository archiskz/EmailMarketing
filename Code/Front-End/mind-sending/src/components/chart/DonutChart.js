import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, IAccLoadedEventArgs,
    AccumulationDataLabel, Inject, AccumulationTheme
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import axios from 'axios';
class DonutChart extends Component {

  

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
            
            <AccumulationChartComponent id="pie-chart"
            title='LIST CONTACT BY TYPE'
            legendSettings={{
                visible: true,
                position: 'Top'
            }}
            enableSmartLabels={true}
            load={this.load.bind(this)}
            tooltip={{ enable: false }}
            loaded={this.onChartLoad.bind(this)}
        >
            <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective name='Project' dataSource={this.props.data1} xName='x' yName='y' innerRadius='40%' startAngle={0}
                    endAngle={360} radius='80%' explode={true} explodeOffset='10%' explodeIndex={3}
                    dataLabel={{
                        visible: true,
                        name: 'text',
                        position: 'Inside',
                        font: {
                            fontWeight: '600',
                            color: '#ffffff'
                        }
                    }}
                >
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
    document.getElementById('pie-chart').setAttribute('title', 'LIST CONTACT BY TYPE');
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
export default DonutChart;