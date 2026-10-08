import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../resources/img/vision.png";

const MainPage = ({ selectedChar, onSelectedChar }) => {
    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <CharList onSelectedChar={onSelectedChar} />
                <ErrorBoundary>
                    <CharInfo charId={selectedChar?.id} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;