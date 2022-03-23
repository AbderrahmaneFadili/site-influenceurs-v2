import React, { useEffect, useState } from "react";
import LanguagesList from "./LanguagesList";
import { useDispatch } from "react-redux";
import {
  addlanguageAction,
  editLanguageAction,
  getAlllanguagesAction,
} from "../../../redux/actions/languages.actions";
import "./Language.css";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddLanguage from "./AddLanguage";
import EditLanguage from "./EditLanguage";

const Language = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  //handle close
  const handleClose = () => setShow(false);
  //handle show
  const handleShow = () => setShow(true);

  //get ALl languages
  const getAlllanguages = () => {
    dispatch(getAlllanguagesAction(0, 6));
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