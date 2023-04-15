import errorGif from './error.gif'

const Error = () => {
    const styles = {
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto'
    }
    return <img alt="error" src={errorGif} style={styles}/>
}

export default Error;