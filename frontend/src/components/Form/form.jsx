// form.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; // Adicione useNavigate aqui
import "../Form/form.css";

Modal.setAppElement("#root");

const initialState = {
  username: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  dob: "",
  gender: "male",
};

function LoginForm() {
  const { t } = useTranslation();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [formFields, setFormFields] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  
  const handleOpenModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 480;
      const modalWidth = isMobile ? "100%" : window.innerWidth <= 600 ? "88%" : "70%";
      const modalHeight = isMobile ? "100%" : window.innerWidth >= 480 ? "88%" : "100%";

      setModalStyle({
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: modalWidth,
        height: modalHeight,
        borderRadius: "10px",
        padding: "20px",
        overflow: "auto",
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [modalStyle, setModalStyle] = useState({
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    padding: "20px",
    overflow: "auto",
  });
  const handleForgotPasswordClick = () => {
    // Redireciona para a página de redefinição de senha
    navigate("/reset");
  };

  return (
    <section className="form-side">
      <div className="form">
        <input
          id="email-login"
          type="text"
          className="entrada"
          placeholder={t("enter_email")}
          value={formFields.email}
          required
        />
        <input
          id="password-login"
          type="password"
          className="entrada"
          placeholder={t("enter_password")}
          value={formFields.password}
          required
        />
        <button id="loginButton" value="Sign In" className="entrada pink">
          {t("login")}
        </button>

        <span
          onClick={handleForgotPasswordClick}
          className="forgot-password-link"
        >
          {t("forgot_password")}
        </span>
        <div className="line"></div>
        <button
          id="create-account-button"
          type="button"
          className="black-btn"
          onClick={handleOpenModal}
        >
          {t("create_account")}
        </button>
        <div className="h elp">
          <p>
            {t("need_help")}
            <a href="#"> {t("click_here")}.</a>
          </p>
        </div>
      </div>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
      style={{ content: modalStyle }}
      >
        <div className="popup">
          <div className="popup-content">
            <div className="close-button" onClick={handleCloseModal}>
              x
            </div>
            <h2>{t("register_now")}</h2>
            <p>{t("free_and_fast")}</p>
            <form>
              <input
                type="text"
                className={`entrada ${formErrors.username && "input-error"}`}
                id="username"
                placeholder={t("username")}
                value={formFields.username}
                required
              />
              {formErrors.username && (
                <p className="error-message">{formErrors.username}</p>
              )}

              <div className="flex-container">
                <div className="flex-item">
                  <input
                    type="text"
                    className={"entrada"}
                    id="firstName"
                    placeholder={t("first_name")}
                    value={formFields.firstName}
                    required
                  />
                  {formErrors.firstName && (
                    <p className="error-message">{formErrors.firstName}</p>
                  )}
                </div>
                <div className="flex-item">
                  <input
                    type="text"
                    className={"entrada"}
                    id="lastName"
                    placeholder={t("last_name")}
                    value={formFields.lastName}
                    required
                  />
                  {formErrors.lastName && (
                    <p className="error-message">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <input
                type="tel"
                id="phone"
                className="entrada"
                placeholder={t("phone")}
                value={formFields.phone}
              />

              <input
                type="email"
                className={`entrada ${formErrors.email && "input-error"}`}
                id="email"
                placeholder={t("email")}
                value={formFields.email}
                required
              />
              {formErrors.email && (
                <p className="error-message">{formErrors.email}</p>
              )}

              <input
                type="password"
                className={`entrada ${formErrors.password && "input-error"}`}
                id="password"
                placeholder={t("password")}
                value={formFields.password}
                required
              />

              <input
                type="password"
                className={`entrada ${
                  formErrors.confirmPassword && "input-error"
                }`}
                id="confirmPassword"
                placeholder={t("confirm_password")}
                value={formFields.confirmPassword}
                required
              />
              {formErrors.confirmPassword && (
                <p className="error-message">{formErrors.confirmPassword}</p>
              )}

              <label htmlFor="dob" className="with-placeholder">
                {t("dob_label")}
              </label>
              <input
                type="date"
                id="dob"
                max="2005-01-01"
                required
              />

              <label htmlFor="gender" className="with-placeholder">
                {t("select_gender_label")}
              </label>
              <select
                id="gender"
                name="gender"
                value={formFields.gender}
                required
              >
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
                <option value="other">{t("other")}</option>
              </select>

              <button className="signuping" type="button">
                {t("register_button")}
              </button>
              {registrationMessage && (
                <p className="registration-message">{registrationMessage}</p>
              )}
              {loginMessage && <p className="login-message">{loginMessage}</p>}
            </form>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default LoginForm;
