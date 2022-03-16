import React from "react";

const ManagerLogin = () => {
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="/">
              Site <b>Influenceur</b> V2
            </a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                Connexion au compte administrateur
              </p>
              <form className="mb-5" method="post">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mot de passe"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* /.col */}
                  <div className="col">
                    <button type="submit" className="btn btn-primary btn-block">
                      Envoyé
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              {/* /.social-auth-links */}
              <p className="mb-1">
                <a href="forgot-password.html">j'ai oublié mon mot de passe</a>
              </p>
              <p className="mb-0">
                <a href="/manager/register" className="text-center">
                  S'inscrire
                </a>
              </p>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerLogin;
