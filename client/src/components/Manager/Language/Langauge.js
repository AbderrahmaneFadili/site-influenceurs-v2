import React, { useEffect, useState } from "react";
import LanguagesList from "./LanguagesList";
import { useDispatch } from "react-redux";
import {
  addLangaugeAction,
  editLanguageAction,
  getAllLangaugesAction,
} from "../../../redux/actions/langauges.actions";
import "./Langauge.css";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddLanguage from "./AddLanguage";
import EditLanguage from "./EditLanguage";

const Langauge = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  //handle close
  const handleClose = () => setShow(false);
  //handle show
  const handleShow = () => setShow(true);

  //get ALl langauges
  const getAllLangauges = () => {
    dispatch(getAllLangaugesAction(0, 6));
  };

  //handle add language
  const addLanguage = (langauge) => {
    dispatch(addLangaugeAction(langauge));
  };

  //handle edit langauge
  const editLanguage = (langauge) => {
    dispatch(editLanguageAction(langauge));
  };

  useEffect(() => {
    getAllLangauges();
  }, []);

  const { url, path } = useRouteMatch();

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

export default Langauge;
