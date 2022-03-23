import React from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";
import {
  editLanguageAction,
  findLanguageAction,
  clearError,
  clearMessage,
} from "../../../redux/actions/languages.actions";
import { connect } from "react-redux";
import { isEqual } from "lodash";
import { Alert } from "react-bootstrap";

class EditLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    });

    this.setState({
      ...this.state,
      errorsMessages: errorsMessages,
    });

    if (errors.length === 0) {
      this.props.editLanguageAction(
        this.state.language,
        this.props.match.params.id
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

  closeSuccessAlert = (event) => {
    clearMessage();
  };

  closeDangerAlert = (event) => {
    clearError();
  };

  render = () => {
    console.log(this.props);

    return (
      <>
        <Link to="/manager/dashboard/languages">Retour à la liste</Link>
        {this.props.message && (
          <Alert className="mt-3" variant="success row align-items-center">
            {this.props.message}
            <i
              className="fas fa-times close-icon ml-auto"
              onClick={this.closeSuccessAlert}
            ></i>
          </Alert>
        )}
        {this.props.error && (
          <Alert className="mt-3" variant="danger row align-items-center">
            {this.props.error}
            <i
              className="fas fa-times close-icon ml-auto"
              onClick={this.closeDangerAlert}
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
    message: state.languageReducer.message,
    error: state.languageReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  findLanguageAction: (id) => dispatch(findLanguageAction(id)),
  editLanguageAction: (language, id) =>
    dispatch(editLanguageAction(language, id)),
  clearError: () => dispatch(clearError()),
  clearMessage: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLanguage);

// const EditLanguage = () => {
//   const { language, loading } = useSelector((state) => state.languageReducer);

//   console.log(language);

//   //* language state
//   const [languageValue, setLanguage] = useState(language ? language.title : "");

//   //* handle change
//   let handleChange = (event) => setLanguage(event.target.value);

//   //* form errors
//   const [errors, setErrors] = useState([]);
//   //*errors messages
//   const [errorsMessages, setErrorsMessages] = useState({
//     languageErrorMessage: "",
//   });

//   //*has error handle
//   const hasError = (key) => {
//     return errors.indexOf(key) !== -1;
//   };

//   const dispatch = useDispatch();
//   //params
//   const params = useParams();

//   useEffect(() => {
//     console.log("Edit Render");
//     dispatch(findLanguageAction(params.id));
//   }, []);

//   //* handle submit
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     //* Add Or Edit
//     //*errors
//     const errors = [];
//     //*error messages
//     let errorsMessages = {};

//     if (isEmpty(languageValue)) {
//       errors.push("language");
//       errorsMessages = {
//         ...errorsMessages,
//         languageErrorMessage: "Ce champ est requis!",
//       };
//     }

//     setErrors(errors);

//     setErrorsMessages(errorsMessages);

//     if (errors.length === 0) {
//     }
//   };

//   return (
//     <>
//       <Link to="/manager/dashboard/languages">Retour à la liste</Link>
//       <div className="card card-secondary mt-3">
//         <div className="card-header">
//           <h3 className="card-title">Modifier la langue</h3>
//         </div>
//         {/* /.card-header */}
//         {/* form start */}
//         <form onSubmit={handleSubmit}>
//           <div className="card-body">
//             <div className="input-group  has-validation">
//               <input
//                 type="text"
//                 name="language"
//                 className={
//                   hasError("language")
//                     ? "form-control is-invalid"
//                     : "form-control"
//                 }
//                 value={languageValue}
//                 placeholder="Label"
//                 onChange={handleChange}
//               />
//               <div className="input-group-append">
//                 <div className="input-group-text">
//                   <i className="fas fa-tag"></i>
//                 </div>
//               </div>
//               <span
//                 className={
//                   hasError("language") ? "error invalid-feedback" : "hidden"
//                 }
//               >
//                 {errorsMessages.languageErrorMessage &&
//                   errorsMessages.languageErrorMessage}
//               </span>
//             </div>
//           </div>
//           <div className="card-footer">
//             <button className="btn btn-success">Modifier</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };
