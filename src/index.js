import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { HashRouter as Router, Route, Switch ,Redirect } from "react-router-dom";

import indexRoutes from "./routes/index.js";
import NotFound from './views/Exception/404';

const hist = createBrowserHistory();

ReactDOM.render(
    <Router >
        <Switch> 
        {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component}  key={key} />;
        })}
            <Route render={NotFound} />
        </Switch>
    </Router>,
    document.getElementById("root")
);



