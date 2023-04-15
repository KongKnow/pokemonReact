import './randomChar.scss';
import mjolnir from '../../resources/img/pokemon.png';
import { Component } from 'react';
import PokemonService from '../../services/PokemonService';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

class RandomChar extends Component{
    state = {
        char: {},
        loading: false,
        error: false
    }

    pokemonService = new PokemonService();

    componentDidMount(){
        this.randomizeChar();
    }

    onError = () => {
        this.setState({loading: false,error: true});
    }

    randomizeChar = () => {
        this.setState(({loading: true, error: false}))
        let id = Math.floor(Math.random() * (500 - 0) + 0);
        this.pokemonService.getCharacter(id)
        .then(res => {
            this.setState({
                char: res,
                loading: false,
                error: false
            })
        })
        .catch(this.onError)
    }

    render() {
        const {char: {name, description, thumbnail}, loading, error} = this.state
        const errorComp = error ? <Error/> : null,
            loadingComp = loading ? <Spinner/> : null,
            content = !(error || loading) ? <RandomCharRender name={name} thumbnail={thumbnail} description ={description}/> : null;

        return (
            <div className="randomchar">
                {loadingComp}
                {errorComp}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.randomizeChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} style={{width: '30%', transform: 'translateX(-50px)'}} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const RandomCharRender = (props) => {
    let descr;
    if(props.description) {
        descr = props.description.map(item => item.join(': ')).join(', ')
    }
    return (
        <div className="randomchar__block">
            <img src={props.thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{props.name}</p>
                <p className="randomchar__descr">
                    {
                        descr
                    }
                </p>
            </div>
        </div>
    )
}

export default RandomChar;