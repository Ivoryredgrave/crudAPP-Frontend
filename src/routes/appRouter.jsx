import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import AuthRouter from "./authRouter";
import { MainMenu } from "../menu/MainMenu";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/auth" component={AuthRouter} />
                <Route exact path="/menu" component={MainMenu} />
                <Redirect to="/auth/login" />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;