import { useState, useCallback} from "react";

import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../resources/img/vision.png";
import CharSearchForm from "../components/charSearchForm/charSearchForm";

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onSelectedChar = useCallback((charId) => {
        setSelectedChar(charId);
    }, []);

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                    <CharList onSelectedChar={onSelectedChar} />
                    <div>
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharSearchForm />
                        </ErrorBoundary>
                    </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;