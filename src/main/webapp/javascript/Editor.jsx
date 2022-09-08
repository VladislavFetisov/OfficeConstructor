import React, {Component} from "react";
import '../css/Main.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import logo from "../../resources/images/logo.png";
import {Redirect, withRouter} from 'react-router-dom';
import Properties from "./Properties";
import Map from './Map'
import {editModes} from "./Map";
import {CELL_WIDTH} from "./Map";
import {CELL_HEIGHT} from "./Map";
import {itemTypes} from "./Item";
import Employee from "./Employee";
import EmployeeInfo from "./EmployeeInfo";
import icon from "../../resources/images/profile.png";
import trash from "../../resources/images/delete.png";
import save from "../../resources/images/save.png";
import search from "../../resources/images/search.png";

const INDENT_X = CELL_WIDTH * 5;
const INDENT_Y = CELL_HEIGHT * 5;

const states = Object.freeze({'new':'NEW', 'deleted':'DELETED', 'active':'ACTIVE'});

class Editor extends Component {
    constructor(props) {
        super(props);
        const maxItemId = props.editor?.items?.length > 0
            ? props.editor?.items?.map(item => item.itemId).sort((a, b) => b - a)[0]
            : 0
        const maxWallId = props.editor?.walls?.length > 0
            ? props.editor?.walls?.map(wall => wall.wallId).sort((a, b) => b - a)[0]
            : 0
        const maxAreaId = props.editor?.areas?.length > 0
            ? props.editor?.areas?.map(area => area.areaId).sort((a, b) => b - a)[0]
            : 0
        const maxEmployeeId = props.editor?.employees?.length > 0
            ? props.editor?.employees?.map(employee => employee.employeeId).sort((a, b) => b - a)[0]
            : 0
        this.state = {
            floors: props.floors?.sort((a, b) => a.floorId - b.floorId),
            editor: props.editor,
            mode: this.props.isAdmin ? editModes.normal : editModes.user,
            mousePos: {x:-999, y:-999},
            propertiesOpen: false,
            employeeInfoOpen: false,
            chosenItem: null,
            chosenEmployee: null,
            cameraPos: {x:0, y:0},
            newAreaName: '',
            itemMockId: maxItemId + 1,
            wallMockId: maxWallId + 1,
            areaMockId: maxAreaId + 1,
            employeeMockId: maxEmployeeId + 1,
            curBtnList: null,
            buildingName: props.buildingName,
            searchText: ''
        };
        this.createItem = this.createItem.bind(this);
        this.updateItemData = this.updateItemData.bind(this);
        this.updateItemDescription = this.updateItemDescription.bind(this);
        this.openProperties = this.openProperties.bind(this);
        this.closeProperties = this.closeProperties.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.startWallCreation = this.startWallCreation.bind(this);
        this.setMode = this.setMode.bind(this);
        this.handleClickOnWall = this.handleClickOnWall.bind(this);
        this.createFloor = this.createFloor.bind(this);
        this.changeCurrentFloor = this.changeCurrentFloor.bind(this);
        this.deleteWall = this.deleteWall.bind(this);
        this.saveCurrentFloor = this.saveCurrentFloor.bind(this);
        this.updateCameraPos = this.updateCameraPos.bind(this);
        this.handleClickOnItem = this.handleClickOnItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateAreaName = this.updateAreaName.bind(this);
        this.createArea = this.createArea.bind(this);
        this.updateAreaData = this.updateAreaData.bind(this);
        this.deleteArea = this.deleteArea.bind(this);
        this.handleClickOnArea = this.handleClickOnArea.bind(this);
        this.updateAreaName = this.updateAreaName.bind(this);
        this.changeCurBtnList = this.changeCurBtnList.bind(this);
        this.createEmployee = this.createEmployee.bind(this);
        this.updateEmployeeData = this.updateEmployeeData.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.updateEmployeeInfo = this.updateEmployeeInfo.bind(this);
        this.openEmployeeInfo = this.openEmployeeInfo.bind(this);
        this.closeEmployeeInfo = this.closeEmployeeInfo.bind(this);
        this.handleClickOnEmployee = this.handleClickOnEmployee.bind(this);
        this.updateBuildingName = this.updateBuildingName.bind(this);
        this.deleteBuilding = this.deleteBuilding.bind(this);
        this.deleteFloor = this.deleteFloor.bind(this);
        this.searchInFloor = this.searchInFloor.bind(this);
        this.updateSearchText = this.updateSearchText.bind(this);
    }

    setMode(newMode) {
        this.setState({
            mode: newMode
        });
    }

    updateCameraPos(newPos) {
        this.setState({
            cameraPos: newPos
        })
    }

    createItem(itemType) {
        const newItem = {
            itemId: this.state.itemMockId,
            x: -this.state.cameraPos.x + INDENT_X,
            y: -this.state.cameraPos.y + INDENT_Y,
            state: states.new,
            itemType: itemType,
            angle: 0,
            description: ''
        };
        this.state.editor.items.push(newItem)
        this.setState({
            editor: this.state.editor,
            itemMockId: this.state.itemMockId + 1
        })
    }

    updateItemData(data) {
        this.state.editor.items = this.state.editor.items.map(item =>
            item.itemId === data.itemId
                ? {
                    itemId: item.itemId,
                    x: data.x,
                    y: data.y,
                    state: item.state,
                    itemType: item.itemType,
                    angle: data.angle,
                    description: data.description
                }
                : item
        );
        this.setState({
            editor: this.state.editor
        });
    }

    deleteItem(id) {
        let k;
        for (let i = 0; i < this.state.editor.items.length; i++) {
            if (this.state.editor.items[i].itemId === id) {
                k = i;
            }
        }
        if (this.state.editor.items[k].state === states.new) {
            this.state.editor.items.splice(k, 1);
        } else {
            const item = this.state.editor.items[k];
            this.state.editor.items[k] = {
                itemId: item.itemId,
                x: item.x,
                y: item.y,
                state: states.deleted,
                itemType: item.itemType,
                angle: item.angle,
                description: item.description
            };
        }
        this.setState({
            editor: this.state.editor
        });
    }

    handleClickOnItem(id) {
        if (this.state.mode === editModes.delete) {
            this.deleteItem(id)
        } else  {
            this.openProperties(id);
        }
    }

    updateItemDescription(newDescription) {
        this.state.editor.items = this.state.editor.items.map(item =>
            item.itemId === this.state.chosenItem.itemId
                ? {
                    itemId: item.itemId,
                    x: item.x,
                    y: item.y,
                    state: item.state,
                    itemType: item.itemType,
                    angle: item.angle,
                    description: newDescription
                }
                : item
        );
        this.setState({
            editor: this.state.editor
        });
    }

    openProperties(itemId) {
        this.closeProperties();

        let item;
        for (let i = 0; i < this.state.editor.items.length; i++) {
            if (this.state.editor.items[i].itemId === itemId) {
                item = this.state.editor.items[i];
                break;
            }
        }
        if (item == null) {
            throw Error('There is no item with such id: ' + itemId);
        }

        this.setState({
            propertiesOpen: true,
            chosenItem: item
        });
    }

    closeProperties() {
        this.setState({
            propertiesOpen: false,
            chosenItem: null
        });
    }

    createEmployee() {
        const newEmployee = {
            employeeId: this.state.itemMockId,
            x: -this.state.cameraPos.x + INDENT_X,
            y: -this.state.cameraPos.y + INDENT_Y,
            state: states.new,
            personalData: '',
            post: '',
            phoneNumber: ''
        };
        this.state.editor.employees.push(newEmployee)
        this.setState({
            editor: this.state.editor,
            employeeMockId: this.state.itemMockId + 1
        })
    }

    updateEmployeeData(data) {
        this.state.editor.employees = this.state.editor.employees.map(employee =>
            employee.employeeId === data.employeeId
                ? {
                    employeeId: employee.employeeId,
                    x: data.x,
                    y: data.y,
                    state: employee.state,
                    personalData: employee.personalData,
                    post: employee.post,
                    phoneNumber: employee.phoneNumber
                }
                : employee
        );
        this.setState({
            editor: this.state.editor
        });
    }

    deleteEmployee(id) {
        let k;
        for (let i = 0; i < this.state.editor.employees.length; i++) {
            if (this.state.editor.employees[i].employeeId === id) {
                k = i;
            }
        }
        if (this.state.editor.employees[k].state === states.new) {
            this.state.editor.employees.splice(k, 1);
        } else {
            const employee = this.state.editor.employees[k];
            this.state.editor.employees[k] = {
                employeeId: employee.employeeId,
                x: employee.x,
                y: employee.y,
                state: states.deleted,
                personalData: employee.personalData,
                post: employee.post,
                phoneNumber: employee.phoneNumber
            };
        }
        this.setState({
            editor: this.state.editor
        });
    }

    handleClickOnEmployee(id) {
        if (this.state.mode === editModes.delete) {
            this.deleteEmployee(id)
        } else  {
            this.openEmployeeInfo(id);
        }
    }

    updateEmployeeInfo(newPersonalData, newPost, newPhoneNumber) {
        this.state.editor.employees = this.state.editor.employees.map(employee =>
            employee.employeeId === this.state.chosenEmployee.employeeId
                ? {
                    employeeId: employee.employeeId,
                    x: employee.x,
                    y: employee.y,
                    state: employee.state,
                    personalData: newPersonalData,
                    post: newPost,
                    phoneNumber: newPhoneNumber
                }
                : employee
        );
        this.setState({
            editor: this.state.editor
        });
    }

    openEmployeeInfo(employeeId) {
        this.closeEmployeeInfo();

        let employee;
        for (let i = 0; i < this.state.editor.employees.length; i++) {
            if (this.state.editor.employees[i].employeeId === employeeId) {
                employee = this.state.editor.employees[i];
                break;
            }
        }
        if (employee == null) {
            throw Error('There is no item with such id: ' + employeeId);
        }

        this.setState({
            employeeInfoOpen: true,
            chosenEmployee: employee
        });
    }

    closeEmployeeInfo() {
        this.setState({
            employeeInfoOpen: false,
            chosenEmployee: null
        });
    }

    createArea() {
        if (this.state.newAreaName === '') return;
        const newArea = {
            areaId: this.state.areaMockId,
            x: -this.state.cameraPos.x + INDENT_X,
            y: -this.state.cameraPos.y + INDENT_Y,
            state: states.new,
            areaName: this.state.newAreaName
        };
        this.state.editor.areas.push(newArea);
        this.setState({
            editor: this.state.editor,
            areaMockId: this.state.areaMockId + 1
        })
    }

    updateAreaData(data) {
        this.state.editor.areas = this.state.editor.areas.map(area =>
            area.areaId === data.areaId
                ? {
                    areaId: area.areaId,
                    x: data.x,
                    y: data.y,
                    state: area.state,
                    areaName: area.areaName
                }
                : area
        );
        this.setState({
            editor: this.state.editor
        });
    }

    deleteArea(id) {
        let k;
        for (let i = 0; i < this.state.editor.areas.length; i++) {
            if (this.state.editor.areas[i].areaId === id) {
                k = i;
            }
        }
        if (this.state.editor.areas[k].state === states.new) {
            this.state.editor.areas.splice(k, 1);
        } else {
            const area = this.state.editor.areas[k];
            this.state.editor.areas[k] = {
                areaId: area.areaId,
                x: area.x,
                y: area.y,
                state: states.deleted,
                areaName: area.areaName
            };
        }
        this.setState({
            editor: this.state.editor
        });
    }

    handleClickOnArea(id) {
        if (this.state.mode !== editModes.delete) return;
        this.deleteArea(id);
    }

    startWallCreation() {
        const mousePos = this.state.mousePos;
        const posX = Math.round((mousePos.x - this.state.cameraPos.x) / CELL_WIDTH) * CELL_WIDTH;
        const posY = Math.round((mousePos.y - this.state.cameraPos.y) / CELL_HEIGHT) * CELL_HEIGHT;

        const newWall = {
            wallId: this.state.wallMockId,
            x: posX,
            y: posY,
            dx: 0,
            dy: 0,
            state: states.new
        };
        this.state.editor.walls.push(newWall);
        this.setState({
            editor: this.state.editor,
            wallMockId: this.state.wallMockId + 1
        });
        this.setMode(editModes.wallEnd);
    }

    changeCurrentWall() {
        const mousePos = this.state.mousePos;
        const lastWall = this.state.editor.walls.pop();
        lastWall.dx = Math.round((mousePos.x - this.state.cameraPos.x - lastWall.x) / CELL_WIDTH) * CELL_WIDTH;
        lastWall.dy = Math.round((mousePos.y - this.state.cameraPos.y - lastWall.y) / CELL_HEIGHT) * CELL_HEIGHT;

        this.state.editor.walls.push(lastWall);
        this.setState({
            editor: this.state.editor
        });
    }

    deleteWall(id) {
        let k;
        for (let i = 0; i < this.state.editor.walls.length; i++) {
            if (this.state.editor.walls[i].wallId === id) {
                k = i;
            }
        }
        if (this.state.editor.walls[k].state === states.new) {
            this.state.editor.walls.splice(k, 1);
        } else {
            const wall = this.state.editor.walls[k];
            this.state.editor.walls[k] = {
                wallId: wall.wallId,
                x: wall.x,
                y: wall.y,
                dx: wall.dx,
                dy: wall.dy,
                state: states.deleted
            };
        }
        this.setState({
            editor: this.state.editor
        });
    }

    handleClickOnWall(id) {
        if (this.state.mode !== editModes.delete) return;
        this.deleteWall(id);
    }

    async createFloor() {
        const floorNumber = this.state.floors.length + 1;
        await this.props.saveFloor(floorNumber);
    }

    async changeCurrentFloor(floor) {
        await this.props.updateEditor(this.state.editor);
        const newEditor = await this.props.openEditor(floor.floorId);
        this.setState({
            editor: newEditor
        });
    }

    async saveCurrentFloor() {
        await this.props.updateEditor(this.state.editor);
        this.setState({
            editor: this.props.editor,
            propertiesOpen: false,
            chosenItem: null,
        });
    }

    handleMouseMove(e) {
        const pos = e.target.getStage().getPointerPosition();
        this.setState({
            mousePos: pos
        })
        if (this.state.mode !== editModes.wallEnd) return;
        this.changeCurrentWall(pos);
    }

    handleMouseClick() {
        switch (this.state.mode) {
            case editModes.normal: return;
            case editModes.wallStart: this.startWallCreation(); break;
            case editModes.wallEnd: this.setMode(editModes.normal); break;
        }
    }

    updateAreaName(event) {
        this.setState({
            newAreaName: event.target.value
        });
    }

    changeCurBtnList(id) {
        if (this.state.curBtnList === id) {
            this.setState({
                curBtnList: null
            });
        } else {
            this.setState({
                curBtnList: id
            });
        }
    }

    updateBuildingName(e) {
        if (!this.props.isAdmin) return;
        this.setState({
            buildingName: e.target.value
        })
    }

    async deleteBuilding() {
        await this.props.deleteBuilding();
        const {history} = this.props;
        history.push('/project')
    }

    async deleteFloor(floor) {
        if (floor.floorId === this.state.floors[0].floorId) return;
        await this.saveCurrentFloor();

        await this.props.deleteFloor(floor.floorId);
        const floorId = floor.floorId === this.state.editor.floorId ? this.state.floors[0].floorId : this.state.editor.floorId;
        await this.props.openEditor(floorId);

        this.setState({
            floors: this.props.floors.sort((a, b) => a.floorId - b.floorId),
            editor: this.props.editor
        })
    }

    updateSearchText(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    async searchInFloor() {
        await this.saveCurrentFloor();
        const results = await this.props.searchInFloor(this.state.searchText);
        if (this.state.searchText === '' || results.length === 0) {
            this.setState({
                cameraPos: { x:0, y:0 }
            });
        } else {
            this.setState({
                cameraPos: { x: -results[0].first + INDENT_X / 2, y: -results[0].second + INDENT_Y / 2}
            });
        }
    }

    render() {
        if (this.state.floors == null || this.state.editor == null) {
            return <Redirect to='/project'/>
        }
        const items = this.state.editor.items.filter(item => item.state !== states.deleted);
        const walls = this.state.editor.walls.filter(wall => wall.state !== states.deleted);
        const areas = this.state.editor.areas.filter(area => area.state !== states.deleted);
        const employees = this.state.editor.employees.filter(employee => employee.state !== states.deleted);
        return(
        <div>
            <div className="contents_ed">
                <div className="editor">
                    <div className="header_ed">
                        <img className="logo_ed" src={logo} alt=""/>
                        <div className="changeBuilding">
                            <input
                                name="textField"
                                value={this.state.buildingName}
                                onChange={this.updateBuildingName}
                            />
                            {this.state.buildingName !== this.props.buildingName &&
                            <img className="saveButton" src={save} onClick={() => this.props.saveBuildingName(this.state.buildingName)} />
                            }
                            {this.props.isAdmin &&
                            <img className="trash" src={trash} alt="" onClick={this.deleteBuilding} />
                            }
                        </div>
                        <div className="searchEditor">
                            <input
                                name="textField"
                                value={this.state.searchText}
                                onChange={this.updateSearchText}
                            />
                            <button><img src={search} onClick={this.searchInFloor}/></button>
                        </div>
                        <img className="iconEd" src={icon} alt=""/>
                    </div>
                    <div className="container">
                        <div className="floors">
                            <div id="top">
                                    <p>Этажи</p>
                                    {this.props.isAdmin && <button id="adder" onClick={this.createFloor}>+</button>}
                            </div>
                            <div className="holder">
                                {this.state.floors.map(floor => (
                                    <div className="floor_ed" key={floor.floorId}>
                                        <button
                                            onClick={() => this.changeCurrentFloor(floor)}
                                        >
                                            Этаж {floor.floorNumber}
                                        </button>
                                        <button id="deleteFloor"
                                            onClick={() => this.deleteFloor(floor)}
                                        >
                                            ✖
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="workplace">
                            <Map
                                items={items}
                                walls={walls}
                                areas={areas}
                                employees={employees}
                                updateItemData={(data) => this.updateItemData(data)}
                                updateEmployeeData={(data) => this.updateEmployeeData(data)}
                                handleClickOnItem={this.handleClickOnItem}
                                handleMouseMove={e => this.handleMouseMove(e)}
                                handleMouseClick={this.handleMouseClick}
                                handleClickOnWall={this.handleClickOnWall}
                                updateAreaData={this.updateAreaData}
                                handleClickOnArea={this.handleClickOnArea}
                                handleClickOnEmployee={this.handleClickOnEmployee}
                                mode={this.state.mode}
                                openProperties={this.openProperties}
                                cameraPos={this.state.cameraPos}
                                updateCameraPos={this.updateCameraPos}
                            />
                        </div>
                        <div className="items">
                            {this.props.isAdmin &&
                            <div className="buttonsArea">
                                <button onClick={this.saveCurrentFloor} id="save">Сохранить</button>
                                <button onClick={() => this.changeCurBtnList(0)}>Предметы</button>
                                {this.state.curBtnList === 0 &&
                                    <div>
                                        <button onClick={() => this.createItem(itemTypes.vending)}>Вендинг</button>
                                        <button onClick={() => this.createItem(itemTypes.cornerTable)}>Угловой стол</button>
                                        <button onClick={() => this.createItem(itemTypes.hydrant)}>Пожарный гидрант</button>
                                        <button onClick={() => this.createItem(itemTypes.bank)}>Банкомат</button>
                                        <button onClick={() => this.createItem(itemTypes.mfu)}>МФУ</button>
                                        <button onClick={() => this.createItem(itemTypes.negotiationTable)}>
                                            Стол для переговоров
                                        </button>
                                        <button onClick={() => this.createItem(itemTypes.door)}>Дверь</button>
                                        <button onClick={() => this.createItem(itemTypes.windowItem)}>Окно</button>
                                        <button onClick={() => this.createItem(itemTypes.chair)}>Стул</button>
                                        <button onClick={() => this.createItem(itemTypes.workSpace)}>Рабочее место</button>
                                    </div>
                                }
                                <button onClick={() => this.changeCurBtnList(1)}>Зоны</button>
                                {this.state.curBtnList === 1 &&
                                    <div>
                                        <input
                                            name="textField"
                                            value={this.state.newAreaName}
                                            placeholder={"Название зоны"}
                                            onChange={this.updateAreaName}
                                        />
                                        <button onClick={this.createArea}>Создать зону</button>
                                    </div>
                                }
                                <button onClick={() => this.createEmployee()}>Сотрудник</button>
                                <button onClick={() => this.setMode(editModes.wallStart)}>Создать стену</button>
                                <button onClick={() => this.setMode(editModes.delete)}>Войти в режим удаления</button>
                                {this.state.mode === editModes.delete &&
                                <button onClick={() => this.setMode(editModes.normal)}>Выйти из режима удаления</button>
                                }
                            </div>
                            }
                            {this.state.propertiesOpen &&
                            <div className="window">
                                <Properties
                                    itemDescription={this.state.chosenItem.description}
                                    closeProperties={this.closeProperties}
                                    submitChanges={this.updateItemDescription}
                                    isAdmin={this.props.isAdmin}
                                />
                            </div>
                            }
                            {this.state.employeeInfoOpen &&
                            <div className="window">
                                <EmployeeInfo
                                    personalData={this.state.chosenEmployee.personalData}
                                    post={this.state.chosenEmployee.post}
                                    phoneNumber={this.state.chosenEmployee.phoneNumber}
                                    closeEmployeeInfo={this.closeEmployeeInfo}
                                    submitChanges={this.updateEmployeeInfo}
                                    isAdmin={this.props.isAdmin}
                                />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(Editor);