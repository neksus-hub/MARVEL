import img from './error.gif'

const Error = ({ style, ...props }) => {
    return (
        <img 
            src={img} 
            alt="Ошибка" 
            style={{ objectFit: "contain", ...style }} 
            {...props}
        />
    )
}

export default Error;