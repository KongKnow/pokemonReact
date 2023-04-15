import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import PokemonService from '../../services/PokemonService';
import { Component } from 'react';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

class CharList extends Component{
    state = {
        charList: [],
        loading: false,
        error: false,
        offset: 0,
        charsEnded: false
    }

    pokemonService = new PokemonService();

    componentDidMount() {
        this.setState({loading: true, error: false});
        this.createCharList()
    }

    onError = () => {
        this.setState({loading: false,error: true});
    }

    createCharList = () => {
        
        this.pokemonService.getAllCharacters(this.state.offset)
        .then(res => {
            let charEnded = false;
            if(res.length < 9) {
                charEnded = true;
            }
            res.forEach(item => {
                this.pokemonService.getResources(item)
                .then(res => {
                    this.setState(({charList}) => {
                        charList.push({
                            name: res.name,                        
                            thumbnail: res.sprites.front_default,
                            id: res.id
                        })
                    })
                    this.setState(({
                        loading:false,
                        error: false,
                        charsEnded: charEnded
                    }))
                })
            })
            this.setState(({offset}) => ({
                offset: offset + 9
            }))
        })
        .catch(this.onError)
    }

    onAddChars = () => {
        this.createCharList()
    }

    renderCharList = (data) => {
        const charList = data.map((item, i) => {
            return (
                <li className="char__item" tabIndex={i}  key={item.id} 
                    onClick={(e) => {
                        e.currentTarget.parentElement.childNodes.forEach(item => {
                            item.classList.remove('on-focus')
                        })
                        e.currentTarget.classList.add('on-focus')
                        this.props.onCharFocus(item.id)
                    }}
                    onFocus={(e) => {
                        e.currentTarget.parentElement.childNodes.forEach(item => {
                            item.classList.remove('on-focus')
                        })
                        e.currentTarget.classList.add('on-focus')
                        this.props.onCharFocus(item.id)
                    }}
                    >
                    <img src={item.thumbnail} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return charList
    }

    render() {
        const {loading, error, charsEnded} = this.state
        const errorComp = error ? <Error/> : null,
            loadingComp = loading ? <Spinner/> : null,
            content = !(error || loading) ? this.renderCharList(this.state.charList) : null;

        let charListStyle ='char__grid'
        if(loading) {
            charListStyle += ' loading'
        }

        let btnStyle = {};
        if(charsEnded) {
            btnStyle = {display: 'none'};
        } else if (loading) {
            btnStyle = {cursor: 'not-allowed', opacity: 0.5}
        }

        return (
            <div className="char__list">
                
                <ul className={charListStyle}>
                    {content}
                    {loadingComp}
                    {errorComp}
                </ul>
                
                <button className='button button__main button__long' style={btnStyle} onClick={this.onAddChars}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;