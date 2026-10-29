import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SinglePage from "../../pages/SinglePage"
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

import singleComicLayout from '../../pages/singleComicLayout/singleComicLayout';
import SingleCharacterLayout from "../../pages/singleCharacterLayout/singleCharacterLayout";

const Page404 = lazy(() => import('../../pages/Page404'));
const MainPage = lazy(() => import('../../pages/MainPage'));
const ComicsPage = lazy(() => import('../../pages/СomicsPage'));
const SingleComicPage = lazy(() => import('../../pages/SingleComicPage'));

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onSelectedChar = (char) => {
        setSelectedChar(char);
    };

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <Suspense fallback={<Spinner/>}>
                    <main>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <MainPage
                                        selectedChar={selectedChar}
                                        onSelectedChar={onSelectedChar}
                                    />
                                }
                            />
                            <Route path="/comics" element={<ComicsPage />} />
                                <Route
                                    path="/comics/:id"
                                    element={
                                    <SinglePage Component={singleComicLayout} dataType="comic" />
                                    }
                                />
                                <Route
                                    path="/characters/:id"
                                    element={
                                    <SinglePage
                                        Component={SingleCharacterLayout}
                                        dataType="character"
                                    />
                                    }
                                />
                            <Route path="*" element={<Page404/>} />  
                        </Routes>
                    </main>
                </Suspense>
            </div>
        </Router>
    );
};

export default App;