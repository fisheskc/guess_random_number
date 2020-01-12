import React, { Component } from "react";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputGuess: '',
            infoForGuess: '',
            min: 1,
            max: 15,
            randomNumber: ''
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRandomNum(min=1, max=15) {
         return parseInt(Math.floor(Math.random() * (max - min) + min))
    }

    componentDidMount() {
        this.setState({ randomNumber: this.handleRandomNum() })
    }

    handleChange(event) {
        const { name, value, type } = event.target
        this.setState({
            inputGuess: value
        })
    }

    handleSubmit(event) {
        this.yourGuess(event);
    }

    // setState it evaluates the guessed number on change, converts from string to integer
    yourGuess(event) {
        // this should stop the event from bubbling up to `form`
        // form is set up to submit and the submit action has a weird default on codepen apparently
        event.preventDefault();
        // new variable "theGuess", takes in memory the input of the guess from submitted button & is converted from string to integer
        let theGuess = this.state.inputGuess && parseInt(this.state.inputGuess);
        let infoForGuess = 'Too low. Try again.';

        if (theGuess === this.state.randomNumber) {
            infoForGuess = 'You are a winner'
        } else if (theGuess > this.state.randomNumber) {
            infoForGuess = 'Too high. Try again.'
        }

        this.setState({
            infoForGuess
        });
    }

    render() {

        return (
            <>
                <div className="game">
                    <main>
                        <h2>Guess the number</h2>
                        {/* <p>{this.state.handleRandomNum}</p> */}
                                <p>{this.state.infoForGuess}</p>
                        <form className="your-guess">
                            <input className="input-guess"
                                name="inputGuess"
                                type="text"
                                value={this.state.inputGuess}
                                placeholder="inputGuess"
                                onChange={this.handleChange}
                            />
                            <button className="GuessButton" onClick={this.handleSubmit}> <p>Submit</p></button>
                        </form>

                        <p className="info">Your guess: {this.state.inputGuess}</p>
                    </main>
                </div>
            </>
        )
    }
}

export default Game;