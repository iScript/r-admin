import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import indexRoutes from "./routes/index.js";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router >
        <Switch>
        {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
        })}
        </Switch>
    </Router>,
    document.getElementById("root")
);



