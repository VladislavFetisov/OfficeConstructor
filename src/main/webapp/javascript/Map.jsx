import React, {Component} from "react";
import {Layer, Rect, Stage} from "react-konva";
import Area from "./Area";
import Wall from "./Wall";
import Item from "./Item";
import Employee from "./Employee";

export const CELL_WIDTH = 100;
export const CELL_HEIGHT = 100;

export const editModes = Object.freeze({'normal':0, 'wallStart':1, 'wallEnd':2, 'delete':3, 'user':4});

class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const startX = Math.floor((-this.props.cameraPos.x - window.innerWidth) / CELL_WIDTH) * CELL_WIDTH;
        const endX = Math.floor((-this.props.cameraPos.x + window.innerWidth * 2) / CELL_WIDTH) * CELL_WIDTH;

        const startY = Math.floor((-this.props.cameraPos.y - window.innerHeight) / CELL_HEIGHT) * CELL_HEIGHT;
        const endY = Math.floor((-this.props.cameraPos.y + window.innerHeight * 2) / CELL_HEIGHT) * CELL_HEIGHT;

        const gridComponents = [];

        let i = 0;
        const keyValue = Math.ceil((endY - startY) / CELL_HEIGHT) + 1;
        for (let x = startX; x < endX; x += CELL_WIDTH) {
            for (let y = startY; y < endY; y += CELL_HEIGHT) {
                if (i === 4) {
                    i = 0;
                }

                gridComponents.push({id: keyValue * Math.round(x) + Math.round(y), x: x, y: y})
            }
        }

        return(
            <Stage
                x={this.props.cameraPos.x}
                y={this.props.cameraPos.y}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseMove={e => this.props.handleMouseMove(e)}
                onClick={this.props.handleMouseClick}
                draggable
                onDragEnd={e => this.props.updateCameraPos(e.currentTarget.position())}
            >
                <Layer>
                    {gridComponents.map(cell => (
                        <Rect
                            key={cell.id}
                            x={cell.x}
                            y={cell.y}
                            width={CELL_WIDTH}
                            height={CELL_HEIGHT}
                            stroke="black"
                            opacity={0.05}
                        />
                    ))}
                </Layer>
                <Layer>
                    {this.props.walls.map(wall => (
                            <Wall
                                key={wall.wallId}
                                wallId={wall.wallId}
                                x={wall.x}
                                y={wall.y}
                                dx={wall.dx}
                                dy={wall.dy}
                                handleClick={this.props.handleClickOnWall}
                            />
                        )
                    )}
                </Layer>
                <Layer>
                    {this.props.items.map(item => (
                            <Item
                                key={item.itemId}
                                itemId={item.itemId}
                                x={item.x}
                                y={item.y}
                                itemType={item.itemType}
                                angle={item.angle}
                                description={item.description}
                                onChange={this.props.updateItemData}
                                draggable={this.props.mode === editModes.normal}
                                handleClick={this.props.handleClickOnItem}
                            />
                        )
                    )}
                </Layer>
                <Layer>
                    {this.props.employees.map(employee => (
                            <Employee
                                key={employee.employeeId}
                                employeeId={employee.employeeId}
                                x={employee.x}
                                y={employee.y}
                                personalData={employee.personalData}
                                post={employee.post}
                                phoneNumber={employee.phoneNumber}
                                onChange={this.props.updateEmployeeData}
                                draggable={this.props.mode === editModes.normal}
                                handleClick={this.props.handleClickOnEmployee}
                            />
                        )
                    )}
                </Layer>
                <Layer>
                    {this.props.areas.map(area => (
                            <Area
                                key={area.areaId}
                                areaId={area.areaId}
                                x={area.x}
                                y={area.y}
                                areaName={area.areaName}
                                draggable={this.props.mode === editModes.normal}
                                onChange={this.props.updateAreaData}
                                handleClick={this.props.handleClickOnArea}
                            />
                        )
                    )}
                </Layer>
            </Stage>
        );
    }
}

export default Map;