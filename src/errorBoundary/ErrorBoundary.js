import { Component } from "react";
import Error from "../components/error/Error";

class ErrorBoundary extends Component {

    state = {
        error: false
    }

    componentDidCatch(err, errInfo) {
        console.log(errInfo)

        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <Error />
        }

        return this.props.children
    }
}

export default ErrorBoundary