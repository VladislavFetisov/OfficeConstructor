import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import logo2 from "../../resources/images/logo2.png";
import icon from "../../resources/images/profile.png";
import background from "../../resources/images/background.png";
import search from "../../resources/images/search.png";

class HomePage extends Component {
    constructor(props) {
        super(props);
        const maxProjectId = props.projects.length > 0
            ? props.projects.map(project => project.projectId).sort((a, b) => b - a)[0]
            : 0
        this.state = {
            projects: props.projects.sort((a, b) => a.projectId - b.projectId),
            searchText: '',
            mockId: maxProjectId + 1
        }
        this.openProject = this.openProject.bind(this);
        this.createNewProject = this.createNewProject.bind(this);
        this.findProjects = this.findProjects.bind(this);
        this.updateSearchText = this.updateSearchText.bind(this);
    }

    async openProject(id) {
        await this.props.openProject(id);
        const {history} = this.props;
        history.push('/project')
    }

    async createNewProject() {
        await this.props.saveProject('Project ' + this.state.mockId);
        this.setState({
            mockId: this.state.mockId + 1
        });
    }

    async findProjects() {
        if (this.state.searchText === '') {
            await this.props.getAllProjects();
        } else {
            await this.props.findProjects(this.state.searchText);
        }
        this.setState({
            projects: this.props.projects
        });
    }

    updateSearchText(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    render() {
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
                        <div className="searchBar">
                            <label>
                                <input
                                    name="textField"
                                    value={this.state.searchText}
                                    placeholder={"Введите название проекта или здания"}
                                    onChange={this.updateSearchText}
                                />
                            </label>
                            <button><img src={search} onClick={this.findProjects}/></button>
                        </div>
                        <img className="icon" src={icon} alt=""/>
                    </div>
                    <div className="field">
                        <h3>Доступные проекты</h3>

                        <div className="projects">
                            {this.props.isAdmin && <button className="tile" onClick={this.createNewProject}>Создать новый проект</button>}
                            {this.state.projects.map(project => (
                                    <button className="tile"
                                        key={project.projectId}
                                        onClick={() => this.openProject(project.projectId)}
                                    >
                                        {project.projectName}
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

export default withRouter(HomePage);