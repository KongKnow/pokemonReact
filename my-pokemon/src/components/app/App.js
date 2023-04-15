import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/dracon.png';
import { Component } from "react";

class App extends Component{
    state = {
        charId: ''
    }

    onCharFocus = (id) => {
        this.setState({
            charId: id
        })
    }
    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharFocus={this.onCharFocus}/>
                        <CharInfo charId={this.state.charId}/>
                    </div>
                    <img className="bg-decoration" style={{width: '30%', transform: 'translateY(-40px)'}} src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;