import React, {Component} from "react";
import {Line} from "react-konva";

class Wall extends Component {
    render(){
        return(
            <Line
                x={this.props.x}
                y={this.props.y}
                points={[0, 0, this.props.dx, this.props.dy]}
                stroke="black"
                strokeWidth={10}
                onClick={() => this.props.handleClick(this.props.wallId)}
            />
        );
    }
}

export default Wall