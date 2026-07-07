import img from './error.gif'

const Error = () => {
    return (
        <img src={img} style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }} alt="Ошибка" className="error" />
    )
}

export default Error;