import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../../pages";

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onSelectedChar = (char) => {
        setSelectedChar(char);
    };

    return (
        <Router>
            <div className="app">
                <AppHeader />
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
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;