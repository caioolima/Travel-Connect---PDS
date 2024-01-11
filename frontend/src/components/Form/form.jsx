// form.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; // Adicione useNavigate aqui
import "../Form/form.css";

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

<<<<<<< Updated upstream
=======
  const handleInputChange = (field, value) => {
    console.log(`Updating ${field} with value: ${value}`);
    setFormFields({ ...formFields, [field]: value });

     // Limpar a mensagem de erro quando o usuário começar a digitar novamente
  if (formErrors[field]) {
    setFormErrors({ ...formErrors, [field]: '' });
  }
  };

  const clearErrors = () => {
    setFormErrors({});
  };

>>>>>>> Stashed changes
  const handleCloseModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
    clearErrors(); // Limpa os erros ao fechar o modal
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
<<<<<<< Updated upstream
=======
  const handleLoginButtonClick = async () => {
    setRegistrationMessage("");
    setFormErrors({}); // Limpar os erros ao tentar fazer login
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
      username: formFields.username, // Adicione esta linha
      password: formFields.password,
    });
  
      if (response.data.success) {
        setLoginMessage(t('login_success_message'));
        // Lógica adicional após o login bem-sucedido, se necessário
      } else {
        setLoginMessage(response.data.message || t('login_error_message'));
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setLoginMessage(t('login_error_message'));
    }
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
  
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        <button id="loginButton" value="Sign In" className="entrada pink">
          {t("login")}
=======

        <button id="loginButton" value="Sign In" className="entrada pink" onClick={handleLoginButtonClick}>
            {t("login")}
>>>>>>> Stashed changes
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
