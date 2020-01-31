import { LinePath } from "@vx/shape";
import { line } from "d3-shape";
import PropTypes from "prop-types";
import React from "react";

export default class LineChart extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    chartItem: PropTypes.object.isRequired,
    scales: PropTypes.object.isRequired
  };

  doZoom(scales) {
    const el = document.querySelector(`#${this.props.id} path`);
    if (!el) return;
    const { chartItem } = this.props;
    const path = line()
      .x(p => scales.x(p.x))
      .y(p => scales.y(p.y));
    el.setAttribute("d", path(chartItem.points));
  }

  render() {
    const { chartItem, scales } = this.props;
    const color = chartItem.getColor();
    return (
      <g id={this.props.id}>
        <LinePath
          data={chartItem.points}
          x={p => scales.x(p.x)}
          y={p => scales.y(p.y)}
          stroke={color}
        />
      </g>
    );
  }
}
