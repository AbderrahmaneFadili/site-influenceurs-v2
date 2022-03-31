import React from "react";
import { Switch, Route } from "react-router-dom";

const Content = ({ pages, dashboardPath, dashboardComponent }) => {
  return (
    <div
      className="content-wrapper px-5"
      style={{
        minHeight: 50000,
      }}
    >
      <Switch>
        <Route exact path={dashboardPath} component={dashboardComponent} />
        {pages.map(({ path, page }, i) => {
          return <Route key={i.toString()} path={path} component={page} />;
        })}
      </Switch>
    </div>
  );
};

export default Content;
