import React, { useEffect, useState } from "react";
import LanguagesList from "./LanguagesList";
import { useDispatch } from "react-redux";
import {
  addlanguageAction,
  editLanguageAction,
  getAlllanguagesAction,
} from "../../../redux/actions/languages.actions";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddLanguage from "./AddLanguage";
import EditLanguage from "./EditLanguage";
import { max_size, page } from "../../../helpers/paginationsParams";

const Language = () => {
  const dispatch = useDispatch();
  //get ALl languages
  const getAlllanguages = () => {
    dispatch(getAlllanguagesAction(page, max_size));
  };

  useEffect(() => {
    getAlllanguages();
  }, []);

  const { path } = useRouteMatch();

  return (
    <>
      <div className="container pt-5">
        <Switch>
          <Route exact path={`${path}`} component={LanguagesList} />
          <Route exact path={`${path}/add`} component={AddLanguage} />
          <Route exact path={`${path}/edit/:id`} component={EditLanguage} />
        </Switch>
      </div>
    </>
  );
};

export default Language;
