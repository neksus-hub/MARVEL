import Error from "../components/error/Error";
import Spinner from "../components/spinner/Spinner";
import Skeleton from "../components/skeleton/Skeleton";

const setContent = (process, Component, data) => {
        switch(process) {
            case 'Waiting': 
                return <Skeleton />
            case 'Loading': 
                return <Spinner />
            case 'Confirmed': 
                return <Component data={data} />
            case 'Error': 
                return <Error />
            default: 
                throw new Error('Unexpected')
        }
    }

export default setContent