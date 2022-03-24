import React from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";
import {
  editLanguageAction,
  findLanguageAction,
} from "../../../redux/actions/languages.actions";
import { connect } from "react-redux";
import { isEqual } from "lodash";
import { Alert } from "react-bootstrap";
import { clearMessage } from "../../../redux/actions/message.actions";

class EditLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successful: null,
      language: "",
      errors: [],
      errorsMessages: {
        languageErrorMessage: "",
      },
    };
  }

  //* handle language change
  handleLanguageChange = (event) => {
    this.setState({
      ...this.state,
      language: event.target.value,
    });
  };
  //* has error handle
  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  //* handle submit
  handleSubmit = (event) => {
    event.preventDefault();
    //* Add Or Edit
    //*errors
    const errors = [];
    //*error messages
    let errorsMessages = {};

    if (isEmpty(this.state.language)) {
      errors.push("language");
      errorsMessages = {
        ...errorsMessages,
        languageErrorMessage: "Ce champ est requis!",
      };
    }

    this.setState({
      ...this.state,
      errors: errors,
      errorsMessages: errorsMessages,
    });

    if (this.state.errors.length === 0) {
      this.props
        .editLanguageAction(this.state.language, this.props.match.params.id)
        .then(() => {
          this.setState({
            ...this.state,
            successful: true,
          });
        })
        .catch((err) =>
          this.setState({
            ...this.state,
            successful: false,
          })
        );
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.language, this.props.language)) {
      this.setState({
        ...this.state,
        language: nextProps.language !== null ? nextProps.language.title : "",
      });
    }
  }

  //* component did mount
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.findLanguageAction(id);
  }

  closeAlert = (event) => {
    this.props.clearMessage();
    this.setState({
      ...this.state,
      successful: null,
    });
  };

  render = () => {
    console.log(this.props);

    return (
      <>
        <Link to="/manager/dashboard/languages">Retour à la liste</Link>
        {this.state.successful === true && (
          <Alert className="mt-3 row align-items-center" variant="success">
            {this.props.message}
            <i
              className="fas fa-times close-icon ml-auto"
              onClick={this.closeAlert}
            ></i>
          </Alert>
        )}
        {this.state.successful === false && (
          <Alert className="mt-3 row align-items-center" variant="danger">
            {this.props.message}
            <i
              className="fas fa-times close-icon ml-auto"
              onClick={this.closeAlert}
            ></i>
          </Alert>
        )}
        <div className="card card-secondary mt-3">
          <div className="card-header">
            <h3 className="card-title">Modifier la langue</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={this.handleSubmit}>
            <div className="card-body">
              <div className="input-group  has-validation">
                <input
                  type="text"
                  name="language"
                  className={
                    this.hasError("language")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.language}
                  placeholder="Label"
                  onChange={this.handleLanguageChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-tag"></i>
                  </div>
                </div>
                <span
                  className={
                    this.hasError("language")
                      ? "error invalid-feedback"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.languageErrorMessage &&
                    this.state.errorsMessages.languageErrorMessage}
                </span>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-success">Modifier</button>
            </div>
          </form>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    language: state.languageReducer.language,
    message: state.messageReducer.message,
  };
};

const mapDispatchToProps = (dispatch) => ({
  findLanguageAction: (id) => dispatch(findLanguageAction(id)),
  editLanguageAction: (language, id) => {
    try {
      dispatch(editLanguageAction(language, id));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject();
    }
  },
  clearMessage: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLanguage);
