import React from "react";

class Properties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.itemDescription
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            description: event.target.value
        });
    }

    handleSubmit() {
        this.props.submitChanges(this.state.description);
        this.props.closeProperties();
    }

    render() {
        const text = this.props.isAdmin ? 'Введите дополнительную информацию' : 'Дополнительная информация'
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    {text}
                    <textarea name="textField" rows="10" value={this.state.description} onChange={this.handleChange} />
                </label>
                {this.props.isAdmin &&
                <div className="textField_buttons">
                    <button onClick={this.handleSubmit}>✔</button>
                    <button onClick={this.props.closeProperties}>✖</button>
                </div>
                }
            </form>
        );
    }
}

export default Properties