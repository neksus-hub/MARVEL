import Error from "../components/error/Error";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Page404 = () => { 
    const Back = useNavigate()

    return (
        <div>
            <Error/>
            <p style={{'text-align': 'center', 'fontWeight': 'bold', 'fontSize' : '24px' }}>
                Page doesn't exist
            </p>
            <Link 
                to="/" 
                style={{'display': 'block','textAlign': 'center' ,'fontWeight': 'bold', 'fontSize': '24px', 'margin-top': '30px'}}>
                  Return to the previous page
            </Link>
            <p
                style={{'display': 'block','textAlign': 'center' ,'fontWeight': 'bold', 'fontSize': '24px', 'margin-top': '30px'}} 
                onClick={() => Back(-1)}>
                    Return to the previous pag
            </p>
        </div>
    )
 
}

export default Page404