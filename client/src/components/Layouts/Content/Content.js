import React from 'react'
import { Switch, Route } from "react-router-dom";

const Content = ({ pages }) => {
    return (
        <div className="content-wrapper">
            <Switch>
                {
                    pages.map(({ path, page }, i) => {
                        return <Route key={i.toString()} path={path} component={page} />
                    })
                }
            </Switch>
        </div>
    )
}

export default Content