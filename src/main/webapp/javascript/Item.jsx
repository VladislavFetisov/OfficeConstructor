import React, {Component} from "react";
import bank from "../../resources/images/bank.png";
import cornerTable from "../../resources/images/cornerTable.png";
import hydrant from "../../resources/images/hydrant.png";
import mfu from "../../resources/images/mfu.png";
import negotiationTable from "../../resources/images/negotiationTable.png";
import vending from "../../resources/images/vending.png";
import workSpace from "../../resources/images/workSpace.png";
import door from "../../resources/images/door.png";
import windowItem from "../../resources/images/window.png";
import chair from "../../resources/images/chair.png";
import {Image} from "react-konva";

export const itemTypes = Object.freeze({
    vending:'VENDING',
    cornerTable:'CORNER_TABLE',
    hydrant:'HYDRANT',
    bank:'BANK',
    mfu:"MFU",
    negotiationTable:'NEGOTIATION_TABLE',
    workSpace:'WORK_SPACE',
    door: 'DOOR',
    windowItem: 'WINDOW',
    chair: 'CHAIR'
});

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemId: this.props.itemId,
            x: this.props.x,
            y: this.props.y,
            angle: this.props.angle,
            description: this.props.description,
            image: null,
            isDragging: false,
            scaleX: 1,
            scaleY: 1
        };

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.getSrcAndScale = this.getSrcAndScale.bind(this);
        this.rotate = this.rotate.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getSrcAndScale(itemType) {
        switch (itemType) {
            case itemTypes.bank : return {src: bank, scaleX: 0.8, scaleY: 1};
            case itemTypes.cornerTable : return {src: cornerTable, scaleX: 1, scaleY: 1};
            case itemTypes.hydrant : return {src: hydrant, scaleX: 0.8, scaleY: 0.8};
            case itemTypes.mfu : return {src: mfu, scaleX: 0.8, scaleY: 0.8};
            case itemTypes.negotiationTable : return {src: negotiationTable, scaleX: 2.2, scaleY: 2.2};
            case itemTypes.vending : return {src: vending, scaleX: 0.8, scaleY: 1};
            case itemTypes.workSpace : return {src: workSpace, scaleX: 1.2, scaleY: 1.2};
            case itemTypes.door : return {src: door, scaleX: 1, scaleY: 1};
            case itemTypes.windowItem : return {src: windowItem, scaleX: 1, scaleY: 0.1};
            case itemTypes.chair : return {src: chair, scaleX: 0.5, scaleY: 0.5};
        }
    }

    loadImage() {
        this.image = new window.Image();
        const srcAndScale = this.getSrcAndScale(this.props.itemType);
        this.image.src = srcAndScale.src;
        this.scaleX = srcAndScale.scaleX;
        this.scaleY = srcAndScale.scaleY;
        this.image.addEventListener('load', this.handleLoad);
    }

    handleLoad() {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image,
            scaleX: this.scaleX,
            scaleY: this.scaleY
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

    rotate() {
        this.setState({
            angle: (this.state.angle + 90) % 360
        });
    }

    handleClick(e) {
        if (e.evt.ctrlKey) {
            this.rotate();
        } else {
            this.props.handleClick(this.state.itemId);
        }
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
                rotation={this.state.angle}
                onClick={this.handleClick}
                scaleX={this.state.scaleX}
                scaleY={this.state.scaleY}
            />
        );
    }
}

export default Item;