import './charInfo.scss';
import { Component } from 'react';
import PokemonService from '../../services/PokemonService'
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import Skeleton from '../skeleton/Skeleton'

class CharInfo extends Component{
    state = {
        char: null,
        loading: false,
        error: false,
        charSelected: false
    }

    pokemonService = new PokemonService();

    // componentDidMount() {
    //     this.loadChar(this.props.charId)
    // }

    componentDidUpdate = (prevProps) => {
        if(prevProps.charId !== this.props.charId) {
            this.loadChar(this.props.charId)
        }
    }

    onError = () => {
        this.setState({loading: false,error: true});
    }

    loadChar = (id) => {
        this.setState({loading: true, error: false, charSelected: true})
        this.pokemonService.getCharacter(id)
        .then(res => {
            this.setState({
                char: res,
                loading: false,
                error: false
            })
        }).catch(this.onError)
    }

    render() {
        const {loading, error, charSelected} = this.state;
        const errorComp = error ? <Error/> : null,
            loadingComp = loading ? <Spinner/> : null,
            content = !(error || loading || !charSelected) ? <CharLoaded data={this.state.char}/> : null,
            skeleton = !charSelected ? <Skeleton/> : null

        return (
            <div className="char__info">
                    {skeleton}
                    {loadingComp}
                    {errorComp}
                    {content}
            </div>
        )
    }
}

function CharLoaded(props) {
    let descr;
    if(props.data.description) {
        descr = props.data.description.map(item => item.join(': ')).join(', ')
    }
    return (
        <>
            <div className="char__basics">
                    <img src={props.data.thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{props.data.name}</div>
                    </div>
                </div>
                <div className="char__descr">
                    {descr}
                </div>
                <div className="char__comics">Moves:</div>
                <ul className="char__comics-list">
                    {
                        props.data.moves.map((item, i) => {
                            if(i > 10) return;
                            return (
                                <li className="char__comics-item" key={i}>
                                    {item}
                                </li>
                            )
                        })
                    }
                </ul>
        </> 
    )
}

export default CharInfo;