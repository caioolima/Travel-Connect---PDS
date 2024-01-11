// form.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; 
import "../Form/form.css";
import axios from 'axios';

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
  gender: "masculino",
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

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field} with value: ${value}`);
    setFormFields({ ...formFields, [field]: value });

     // Limpar a mensagem de erro quando o usuário começar a digitar novamente
  if (formErrors[field]) {
    setFormErrors({ ...formErrors, [field]: '' });
  }
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
    navigate("/reset");
  };
 
  const handleRegisterButtonClick = async () => {
    setRegistrationMessage("");
    setLoginMessage("");
    setFormErrors({});
    const errors = {};

    const validateEmail = () => {
      const validEmailDomains = ['outlook.com', 'gmail.com', 'hotmail.com'];
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (!emailRegex.test(formFields.email)) {
        return t('invalid_email_error');
      }

      const [, emailDomain] = formFields.email.split('@');

      if (!validEmailDomains.includes(emailDomain.toLowerCase())) {
        return t('valid_email_domains_error');
      }

      return null;
    };

    errors.username = formFields.username.length < 3 ? t('username_length_error') : null;
    errors.firstName = formFields.firstName.length < 3 ? t('first_name_length_error') : null;
    errors.lastName = formFields.lastName.length < 3 ? t('last_name_length_error') : null;

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    errors.password = !passwordRegex.test(formFields.password)
      ? t('password_complexity_error')
      : null;

    errors.confirmPassword = formFields.password !== formFields.confirmPassword ? t('password_mismatch_error') : null;
    errors.phone = formFields.phone.length < 3 ? t('phone_length_error') : null;

    const emailError = validateEmail();
    if (emailError) {
      errors.email = emailError;
    }

    if (Object.values(errors).every(error => !error)) {
      try {
        if (formFields.username !== initialState.username) {
          const userAvailability = await checkFieldAvailability('username', formFields.username);
          if (!userAvailability.available) {
            setRegistrationMessage(t('username_not_available_error'));
            return;
          }
        }

        if (formFields.phone !== initialState.phone) {
          const phoneAvailability = await checkFieldAvailability('phone', formFields.phone);
          if (!phoneAvailability.available) {
            setRegistrationMessage(t('phone_not_available_error'));
            return;
          }
        }

        if (formFields.email !== initialState.email) {
          const emailAvailability = await checkFieldAvailability('email', formFields.email);
          if (!emailAvailability.available) {
            setRegistrationMessage(t('email_not_available_error'));
            return;
          }
        }

        const response = await axios.post('http://localhost:3000/auth/register', {
          username: formFields.username,
          firstName: formFields.firstName,
          lastName: formFields.lastName,
          phone: formFields.phone,
          email: formFields.email,
          password: formFields.password,
          confirmPassword: formFields.confirmPassword,
          dob: formFields.dob,
          gender: formFields.gender,
        });

        if (response.data.success) {
          setRegistrationMessage(t('registration_success_message'));
        } else {
          setRegistrationMessage(response.data.message || t('registration_error_message'));
        }
      } catch (error) {
        console.error('Erro durante o registro:', error);
        setRegistrationMessage(t('registration_error_message'));
      }
    } else {
      setFormErrors(errors);
    }
  };
  
// Função para verificar a disponibilidade de um campo específico
const checkFieldAvailability = async (fieldName, value, t) => {
  try {
    const response = await axios.post(`http://localhost:3000/auth/checkAvailability`, {
      fieldName,
      value,
    });

    return response.data; // Deve conter uma propriedade "available" indicando se está disponível ou não
  } catch (error) {
    console.error(t(`Error checking availability of ${fieldName}:`), error);
    return { available: false }; // Em caso de erro, considerar como não disponível
  }
};


  return (
    <section className="form-side">
      <div className="form">
        <input
          id="email-login"
          type="text"
          className={`entrada ${formErrors.email && "input-error"}`}
          placeholder={t("enter_email")}
          value={formFields.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />

        <input
          id="password-login"
          type="password"
          className={`entrada ${formErrors.password && "input-error"}`}
          placeholder={t("enter_password")}
          value={formFields.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
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
        <div className="help">
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
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
              />
              {formErrors.username && (
                <p className="error-message">{formErrors.username}</p>
              )}

              <div className="flex-container">
                <div className="flex-item">
                  <input
                    type="text"
                    className={`entrada ${formErrors.firstName && "input-error"}`}
                    id="firstName"
                    placeholder={t("first_name")}
                    value={formFields.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                  {formErrors.firstName && (
                    <p className="error-message">{formErrors.firstName}</p>
                  )}
                </div>
                <div className="flex-item">
                  <input
                    type="text"
                    className={`entrada ${formErrors.lastName && "input-error"}`}
                    id="lastName"
                    placeholder={t("last_name")}
                    value={formFields.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                className={`entrada ${formErrors.phone && "input-error"}`}
                placeholder={t("phone")}
                value={formFields.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
              {formErrors.phone && (
                <p className="error-message">{formErrors.phone}</p>
              )}

              <input
                type="email"
                className={`entrada ${formErrors.email && "input-error"}`}
                id="email"
                placeholder={t("email")}
                value={formFields.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              {formErrors.email && (
               <p className={`error-message ${formErrors.email && "input-error"}`}>
               {formErrors.email}
             </p>
              )}

              <input
                type="password"
                className={`entrada ${formErrors.password && "input-error"}`}
                id="password"
                placeholder={t("password")}
                value={formFields.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
              {formErrors.password && (
                <p className="error-message">{formErrors.password}</p>
              )}

              <input
                type="password"
                className={`entrada ${formErrors.confirmPassword && "input-error"}`}
                id="confirmPassword"
                placeholder={t("confirm_password")}
                value={formFields.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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
                onChange={(e) => handleInputChange('dob', e.target.value)}
              />

              <label htmlFor="gender" className="with-placeholder">
                {t("select_gender_label")}
              </label>
              <select
                id="gender"
                name="gender"
                value={formFields.gender}
                required
                onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <option value="masculino">{t("male")}</option>
                  <option value="feminino">{t("female")}</option>
                  <option value="outro">{t("other")}</option>
                </select>
  
                <button className="signuping" type="button" onClick={handleRegisterButtonClick}>
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
  
