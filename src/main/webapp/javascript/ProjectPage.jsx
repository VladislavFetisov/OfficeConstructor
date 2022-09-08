import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';

import logo2 from "../../resources/images/logo2.png";
import icon from "../../resources/images/profile.png";
import background from "../../resources/images/background.png";
import trash from "../../resources/images/delete.png";
import save from "../../resources/images/save.png";
import {Text} from "react-konva";

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        const maxBuildingId = props.buildings?.length > 0
            ? props?.buildings?.map(building => building.buildingId).sort((a, b) => b - a)[0]
            : 0
        this.state = {
            buildings: props.buildings?.sort((a, b) => a.buildingId - b.buildingId),
            mockId: maxBuildingId + 1,
            projectName: props.projectName


        }
        this.openBuilding = this.openBuilding.bind(this);
        this.createNewBuilding = this.createNewBuilding.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.updateProjectName = this.updateProjectName.bind(this);
    }

    async openBuilding(id) {
        await this.props.openBuilding(id);
        const {history} = this.props;
        history.push('/editor')
    }

    async createNewBuilding() {
        await this.props.saveBuilding('Building ' + this.state.mockId);
        this.setState({
            mockId: this.state.mockId + 1
        })
    }

    async deleteProject() {
        await this.props.deleteProject();
        const {history} = this.props;
        history.push('/home')
    }

    updateProjectName(e) {
        if (!this.props.isAdmin) return;
        this.setState({
            projectName: e.target.value
        })
    }

    render() {
        if (this.state.buildings == null) {
            return <Redirect to="/home"/>
        }
        return(
            <div>
            <div
            className="pane"
            style= {{
                backgroundImage: `url(${background})`}}
            >
                <div className="homePage">
                    <div className="header2">
                        <img className="logo2" src={logo2} alt=""/>
                        <div className="updateProject">
                            <input
                                name="textField"
                                value={this.state.projectName}
                                onChange={this.updateProjectName}
                            />
                            {this.state.projectName !== this.props.projectName &&
                            <img className="saveButton" src={save} onClick={() => this.props.saveProjectName(this.state.projectName)} />
                            }
                            {this.props.isAdmin &&
                            <img className="trash" src={trash} alt="" onClick={this.deleteProject} />
                            }
                        </div>
                        <img className="icon" src={icon} alt=""/>
                    </div>
                    <div className="field">
                        <div className="projects">
                            {this.props.isAdmin &&  <button className="tile" onClick={this.createNewBuilding}>Создать новое здание</button>}
                            {this.state.buildings.map(building => (
                                    <button className="tile"
                                        key={building.buildingId}
                                        onClick={() => this.openBuilding(building.buildingId)}
                                    >
                                        {building.buildingName}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default withRouter(ProjectPage);