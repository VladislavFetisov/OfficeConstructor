import React, {Component} from "react";
import {Text} from "react-konva";

class Area extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaId: this.props.areaId,
            areaName: this.props.areaName,
            x: this.props.x,
            y: this.props.y,
            isDragging: false
        };

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    handleDragStart() {
        this.setState({
            isDragging: true
        });
    }

    handleDragEnd(e) {
        this.setState({
            isDragging: false
        });
        this.setState({
            x: e.target.x(),
            y: e.target.y(),
        })
        this.props.onChange(this.state);
    }

    render() {
        return(
            <Text
                x={this.state.x}
                y={this.state.y}
                draggable={this.props.draggable}
                onDragStart={() => this.handleDragStart()}
                onDragEnd={e => this.handleDragEnd(e)}
                onClick={() => this.props.handleClick(this.state.areaId)}
                text={this.state.areaName}
                fontSize={40}
            />
        )
    }
}

export default Area