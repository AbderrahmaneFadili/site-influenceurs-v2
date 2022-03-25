import { isEmpty, isEqual } from "lodash";
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  editInterestAction,
  findInterestAction,
} from "../../../redux/actions/interest.actions";
import { clearMessage } from "../../../redux/actions/message.actions";

class EditInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successful: null,
      interest: "",
      errors: [],
      errorsMessages: {
        interestErrorMessage: "",
      },
    };
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      interest: event.target.value,
    });
  };

  closeAlert = (event) => {
    this.props.clearMessage();
    this.setState({
      ...this.state,
      successful: null,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.interest, this.props.interest)) {
      this.setState({
        ...this.state,
        interest:
          nextProps.interest !== null
            ? nextProps.interest.title
            : this.state.interest,
      });
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.findInterestAction(id);
  }

  //* has error handle
  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  //* handle submit
  handleSubmit = (event) => {
    event.preventDefault();
    //*errors
    const errors = [];
    //*error messages
    let errorsMessages = {};

    if (isEmpty(this.state.interest)) {
      errors.push("interest");
      errorsMessages = {
        ...errorsMessages,
        interestErrorMessage: "Ce champ est requis!",
      };
    }

    this.setState({
      ...this.state,
      errors: errors,
      errorsMessages: errorsMessages,
    });

    if (errors.length === 0) {
      const id = this.props.match.params.id;
      this.props
        .editInterestAction(this.state.interest, id)
        .then(() => {
          this.setState({
            ...this.state,
            interest: this.state.interest,
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            ...this.state,
            successful: false,
          });
        });
    }
  };

  render() {
    return (
      <>
        <Link to="/manager/dashboard/Interests">Retour à la liste</Link>
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
            <h3 className="card-title">Modifier le centre d'intérêt</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={this.handleSubmit}>
            <div className="card-body">
              <div className="input-group  has-validation">
                <input
                  type="text"
                  name="interest"
                  className={
                    this.hasError("interest")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.interest}
                  placeholder="Label"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-tag"></i>
                  </div>
                </div>
                <span
                  className={
                    this.hasError("interest")
                      ? "error invalid-feedback"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.interestErrorMessage &&
                    this.state.errorsMessages.interestErrorMessage}
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
  }
}

const mapStateToProps = (state) => {
  return {
    interest: state.interestReducer.interest,
    message: state.messageReducer.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editInterestAction: (interest, id) => {
      try {
        dispatch(editInterestAction(interest, id));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    findInterestAction: (id) => dispatch(findInterestAction(id)),
    clearMessage: () => {
      dispatch(clearMessage());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInterest);
