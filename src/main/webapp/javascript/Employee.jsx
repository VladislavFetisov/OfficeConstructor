import React, {Component} from "react";
import employeePic from '../../resources/images/employee.png'
import {Image} from "react-konva";

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: this.props.employeeId,
            x: this.props.x,
            y: this.props.y,
            personalData: props.personalData,
            post: props.personalData,
            phoneNumber: props.personalData,
            image: null,
            isDragging: false,
        };

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    loadImage() {
        this.image = new window.Image();
        this.image.src = employeePic;
        this.image.addEventListener('load', this.handleLoad);
    }

    handleLoad() {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };

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

    handleClick() {
        this.props.handleClick(this.state.employeeId);
    }

    componentDidMount() {
        this.loadImage();
    }

    render() {
        return(
            <Image
                image={this.state.image}
                x={this.state.x}
                y={this.state.y}
                draggable={this.props.draggable}
                onDragStart={() => this.handleDragStart()}
                onDragEnd={e => this.handleDragEnd(e)}
                width={100}
                height={100}
                onClick={this.handleClick}
                scaleX={0.8}
                scaleY={0.8}
            />
        );
    }
}

export default Employee;