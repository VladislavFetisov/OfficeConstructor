import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../css/Main.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Editor from './Editor';
import HomePage from "./HomePage";
import ProjectPage from "./ProjectPage";
import LoginPage from "./LoginPage";

const userRoles = Object.freeze({'unknown':'UNKNOWN', 'admin':'ADMIN', 'user':'USER'});

function SecureComponent(props) {
    const isLoggedIn = props.getLoginStatus() !== userRoles.unknown;
    if (isLoggedIn) {
        return props.component;
    } else {
        return (
            <Redirect to={'/login'}/>
        )
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        const userJSON = localStorage.getItem('user');
        const user = userJSON == null ? null : JSON.parse(userJSON);
        const projectJSON = localStorage.getItem('project');
        const project = projectJSON == null ? null : JSON.parse(projectJSON);
        const buildingJSON = localStorage.getItem('building');
        const building = buildingJSON == null ? null : JSON.parse(buildingJSON);
        const editorJSON = localStorage.getItem('editor');
        const editor = editorJSON == null ? null : JSON.parse(editorJSON);
        this.state = {
            user: user,
            project: project,
            building: building,
            editor: editor
        };
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.getProjectsAndRole = this.getProjectsAndRole.bind(this);
        this.findProjects = this.findProjects.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.openProject = this.openProject.bind(this);
        this.saveBuilding = this.saveBuilding.bind(this);
        this.openBuilding = this.openBuilding.bind(this);
        this.saveFloor = this.saveFloor.bind(this);
        this.openEditor = this.openEditor.bind(this);
        this.updateEditor = this.updateEditor.bind(this);
        this.getLoginStatus = this.getLoginStatus.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.deleteBuilding = this.deleteBuilding.bind(this);
        this.deleteFloor = this.deleteFloor.bind(this);
        this.searchInFloor = this.searchInFloor.bind(this);
        this.saveBuildingName = this.saveBuildingName.bind(this);
        this.saveProjectName = this.saveProjectName.bind(this);
    }

    async logIn(login) {
        const projectsAndRole = await this.getProjectsAndRole(login);
        const projects = projectsAndRole.projects;
        const userRole = projectsAndRole.userRole;
        const user = { userRole: userRole, login: login, projects: projects };
        this.setState({
            user: user
        });
        localStorage.user = JSON.stringify(user);
    }

    logOut() {
        localStorage.user = JSON.stringify({ userRole: userRoles.unknown });
    }

    async getProjectsAndRole(login) {
        const data = { userLogin: login };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/projects', requestOptions);
        return response.json();
    }

    async findProjects(text) {
        const data = { text: text };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/search', requestOptions);

        const projects = await  response.json();
        const user = { userRole: this.state.user.userRole, login: this.state.user.login, projects: projects };
        this.setState({
            user: user
        });
        localStorage.user = JSON.stringify(user);
    }

    async getAllProjects() {
        const projectsAndRole = await this.getProjectsAndRole(this.state.user.login);
        const projects = projectsAndRole.projects;
        const userRole = projectsAndRole.userRole;
        const user = { userRole: userRole, login: this.state.user.login, projects: projects };
        this.setState({
            user: user
        });
        localStorage.user = JSON.stringify(user);
    }

    async saveProject(projectName) {
        const data = { projectName: projectName, userLogin: this.state.user.login };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/saveProject', requestOptions);
        const project = await response.json();
        this.state.user.projects.push(project);
        this.setState({
            user: this.state.user
        });
        localStorage.user = JSON.stringify(this.state.user);
        return project;
    }

    async openProject(projectId) {
        const data = { projectId: projectId };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/project', requestOptions);
        const project = await response.json();
        this.setState({
            project: project
        });
        localStorage.project = JSON.stringify(project);
    }

    async deleteProject() {
        const  data = { projectId: this.state.project.projectId }
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        await fetch('http://localhost:8080/main/project', requestOptions);
        await this.getAllProjects();
        this.setState({
            project: null
        });
        localStorage.project = JSON.stringify(null);
    }

    async saveProjectName(newName) {
        const data = { projectId: this.state.project.projectId, projectName: newName };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/renameProject', requestOptions);
        const savedProject = await response.json();
        this.state.project.projectName = await savedProject.projectName;
        this.state.user.projects.map(project =>
            project.projectId === this.state.project.projectId ? this.state.project : project
        );
        this.setState({
            project: this.state.project
        });
        localStorage.project = JSON.stringify(this.state.project);
    }

    async saveBuilding(buildingName) {
        const data = { buildingName: buildingName, projectId: this.state.project.projectId };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/saveBuilding', requestOptions);
        const building = await response.json();
        this.state.project.buildings.push(building);
        this.setState({
            project: this.state.project
        });
        localStorage.project = JSON.stringify(this.state.project);
        return building;
    }

    async openBuilding(buildingId) {
        const data = { buildingId: buildingId };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/building', requestOptions);
        const building = await response.json();
        this.setState({
            building: building
        });
        await this.openEditor(building.floors[0].floorId);
        localStorage.building = JSON.stringify(building);
    }

    async deleteBuilding() {
        const  data = { buildingId: this.state.building.buildingId };
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        await fetch('http://localhost:8080/main/building', requestOptions);
        await this.openProject(this.state.project.projectId);
        this.setState({
            building: null
        });
        localStorage.building = JSON.stringify(null);
    }

    async saveBuildingName(newName) {
        const data = { buildingId: this.state.building.buildingId, buildingName: newName };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/renameBuilding', requestOptions);
        const savedBuilding = await response.json();
        this.state.building.buildingName = await savedBuilding.buildingName;
        this.state.project.buildings.map(building =>
            building.buildingId === this.state.building.buildingId ? this.state.building : building
        );
        this.setState({
            building: this.state.building
        });
        localStorage.building = JSON.stringify(this.state.building);;
    }

    async saveFloor(floorNumber) {
        const data = { floorNumber: floorNumber, buildingId: this.state.building.buildingId };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/saveFloor', requestOptions);
        const floor = await response.json();
        this.state.building.floors.push(floor);
        this.setState({
            building: this.state.building
        });
        localStorage.building = JSON.stringify(this.state.building);
        return floor;
    }

    async openEditor(floorId) {
        const data = {floorId: floorId};
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/editor', requestOptions);
        const editor = await response.json();
        this.setState({
            editor: editor
        });
        localStorage.editor = JSON.stringify(editor);
        return editor;
    }

    async updateEditor(editor) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editor)
        };
        const response = await fetch('http://localhost:8080/main/updateEditor', requestOptions);
        const savedEditor = await response.json();
        this.setState({
            editor: savedEditor
        });
        localStorage.editor = JSON.stringify(savedEditor);
    }

    async deleteFloor(id) {
        const data = { floorId: id }
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        await fetch('http://localhost:8080/main/floor', requestOptions);
        await this.openBuilding(this.state.building.buildingId)
    }

    async searchInFloor(text) {
        const data = { floorId: this.state.editor.floorId, text: text };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/main/searchInFloor', requestOptions);
        return response.json();
    }

    getLoginStatus() {
        const userJSON = localStorage.getItem('user');
        if (userJSON == null) {
            this.logOut();
        }
        return JSON.parse(localStorage.getItem('user'))?.userRole;
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/login'>
                        <LoginPage
                            logIn={this.logIn}
                        />
                    </Route>
                    <Route path='/home'>
                        <SecureComponent
                            getLoginStatus={this.getLoginStatus}
                            component={
                                <HomePage
                                    projects={this.state.user?.projects}
                                    findProjects={this.findProjects}
                                    getAllProjects={this.getAllProjects}
                                    saveProject={this.saveProject}
                                    openProject={this.openProject}
                                    isAdmin={this.state.user?.userRole === userRoles.admin}
                                />
                            }
                        />
                    </Route>
                    <Route path='/project'>
                        <SecureComponent
                            getLoginStatus={this.getLoginStatus}
                            component={
                                <ProjectPage
                                    buildings={this.state.project?.buildings}
                                    saveBuilding={this.saveBuilding}
                                    openBuilding={this.openBuilding}
                                    isAdmin={this.state.user?.userRole === userRoles.admin}
                                    deleteProject={this.deleteProject}
                                    projectName={this.state.project?.projectName}
                                    saveProjectName={this.saveProjectName}
                                />
                            }
                        />
                    </Route>
                    <Route path='/editor'>
                        <SecureComponent
                            getLoginStatus={this.getLoginStatus}
                            component={
                                <Editor
                                    floors={this.state.building?.floors}
                                    editor={this.state.editor}
                                    saveFloor={this.saveFloor}
                                    openEditor={this.openEditor}
                                    updateEditor={this.updateEditor}
                                    isAdmin={this.state.user?.userRole === userRoles.admin}
                                    deleteBuilding={this.deleteBuilding}
                                    buildingName={this.state.building?.buildingName}
                                    deleteFloor={this.deleteFloor}
                                    searchInFloor={this.searchInFloor}
                                    saveBuildingName={this.saveBuildingName}
                                />
                            }
                        />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/login"/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('react-mountpoint')
);

export default userRoles;
