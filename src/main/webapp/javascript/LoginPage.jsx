import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import userRoles from "./Main";

import logo from "../../resources/images/logo.png";
import profile from "../../resources/images/profile.png";
import office from "../../resources/images/image.png";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            loginMessage: '',
        }
        this.checkUserInDB = this.checkUserInDB.bind(this);
        this.updateLogin = this.updateLogin.bind(this);
        this.goHome = this.goHome.bind(this);
        this.logInIfAuthorized = this.logInIfAuthorized.bind(this);
    }

    checkUserInDB() {
        const data = new FormData();

        data.append("username", this.state.login);
        data.append("password", this.state.password);
        const requestOptions = {
            method: 'POST',
            body: data
        };
        return fetch('http://localhost:8080/login', requestOptions)
            .then(result => result.status)
            .catch(error => error.state);
    }

    async logInIfAuthorized() {
        const userExistStatus = 200;
        const userNotFoundStatus = 401;

        const result = await this.checkUserInDB();
        if (result !== userExistStatus && result !== userNotFoundStatus) {
            reject(result);
        }
        const userExist = result === userExistStatus;
        this.setLoginMessage(userExist);

        if (userExist) {
            await this.props.logIn(this.state.login);
            this.goHome();
        }
    }


    goHome() {
        const {history} = this.props;
        history.push('/home')
    }

    setLoginMessage(userExists) {
        if (userExists) {
            this.setState({
                loginMessage: 'Correct!'
            });
        } else {
            this.setState({
                loginMessage: 'There is no such user. Please, check your login and password and try again.'
            });
        }
    }

    setErrorMessage(error) {
        this.setState({
            loginMessage: 'Error: ' + error,
        });
    }

    updateLogin(event) {
        this.setState({
            login: event.target.value,
        });
    }

    updatePassword(event) {
        this.setState({
            password: event.target.value,
        });
    }

    render() {
        return(
            <div className="container">
                <div className="header">
                    <img className="logo"/>
                    <div className="nav">
                        <ul>
                            <li> 🕿  8 800 200-90-02</li>
                            <li><img src={profile} alt="profile icon"/></li>
                        </ul>
                    </div>
                </div>
                <div className="main">
                    <div className="image_box">
                        <img className="office" src={office} alt="office"/>
                    </div>
                    <div className="entrance_box">
                        <h1>Конструктор интерактивных<br></br>карт помещений</h1>
                        <p id="description"> создавайте и редактируйте интерактивные план-схемы помещений с возможностью поиска расположения сотрудника или плана этажа конкретного корпуса </p> <br></br>
                        <h2>Чтобы начать работу, выполните вход в<br></br>личный кабинет:</h2>
                        <form onSubmit={e => {e.preventDefault()}}>
                            <input
                                type="text"
                                name="login"
                                value={this.state.login}
                                placeholder="Введите адрес корпоративной почты"
                                onChange={(e) => this.updateLogin(e)}
                            />
                            <input
                                type="text"
                                name="password"
                                value={this.state.password}
                                placeholder="Введите пароль"
                                onChange={(e) => this.updatePassword(e)}
                            />
                            <button onClick={this.logInIfAuthorized}>Войти в личный кабинет</button>
                            <p>{this.state.loginMessage}</p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginPage);