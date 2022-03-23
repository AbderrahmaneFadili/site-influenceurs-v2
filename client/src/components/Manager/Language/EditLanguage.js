import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";
import { findLanguageAction } from "../../../redux/actions/languages.actions";
import { connect } from "react-redux";
import { isEqual } from "lodash";
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

    if (isEmpty(this.state.langauge)) {
      errors.push("language");
      errorsMessages = {
        ...errorsMessages,
        languageErrorMessage: "Ce champ est requis!",
      };
    }

    this.setState({
      errors: errors,
    });

    this.setState({
      errorsMessages: errorsMessages,
    });

    if (errors.length === 0) {
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.language, this.props.language)) {
      this.setState({
        ...this.state,
        language: nextProps.language && nextProps.language.title,
      });
    }
  }

  //* component did mount
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.findLanguageAction(id);
  }

  render = () => {
    console.log(this.props);

    return (
      <>
        <Link to="/manager/dashboard/languages">Retour à la liste</Link>
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
                  onChange={this.handleChange}
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
  console.log(state.languageReducer);
  return {
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => ({
  findLanguageAction: (id) => dispatch(findLanguageAction(id)),
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
