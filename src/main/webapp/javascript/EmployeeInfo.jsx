import React from "react";

class EmployeeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personalData: props.personalData,
            post: props.post,
            phoneNumber: props.phoneNumber
        };

        this.handleDataChange = this.handleDataChange.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDataChange(event) {
        this.setState({
            personalData: event.target.value
        });
    }

    handlePostChange(event) {
        this.setState({
            post: event.target.value
        });
    }

    handlePhoneChange(event) {
        this.setState({
            phoneNumber: event.target.value
        });
    }

    handleSubmit() {
        this.props.submitChanges(this.state.personalData, this.state.post, this.state.phoneNumber);
        this.props.closeEmployeeInfo();
    }

    render() {
        const text = this.props.isAdmin ? 'Введите информацию о сотруднике' : 'Информация о сотруднике'
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    {text}
                    <textarea name="textField" rows="2" value={this.state.personalData} onChange={this.handleDataChange} />
                    <textarea name="textField" rows="1" value={this.state.post} onChange={this.handlePostChange} />
                    <textarea name="textField" rows="1" value={this.state.phoneNumber} onChange={this.handlePhoneChange} />
                </label>
                {this.props.isAdmin &&
                <div className="textField_buttons">
                    <button onClick={this.handleSubmit}>✔</button>
                    <button onClick={this.props.closeEmployeeInfo}>✖</button>
                </div>
                }
            </form>
        );
    }
}

export default EmployeeInfo