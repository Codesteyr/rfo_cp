import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../../axios-client";
import RecaptchaChange from "../../components/recaptcha";
import { useStateContext } from "../../contexts/ContextProvider";
import Modal from "../../components/TermsOfUseModal";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [recaptchaToken, setRecaptchaToken] = useState(null); // Используйте состояние для хранения токена
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);
  const [checked, setChecked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { setUser, setToken } = useStateContext();

  const handleRecaptchaChange = (value) => {
    setRecaptchaToken(value);
  };

  async function onSubmit(ev) {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      recaptchaToken: recaptchaToken,
      agreement: checked,
    };
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  }

  const handleTermsOfUse = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setChecked(false);
    setModalOpen(false);
  };

  const handleAgreement = () => {
    setChecked(true);
    setModalOpen(false);
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <div className="titleRegistration">
            <h1 className="title">Регистрация</h1>
            {errors && (
              <div className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
          </div>
          <div className="loginSignup">
            <input ref={nameRef} type="text" placeholder="Логин" />
            <input
              ref={emailRef}
              type="email"
              placeholder="Электронная почта"
            />
            <input ref={passwordRef} type="password" placeholder="Пароль" />
            <input
              ref={passwordConfirmationRef}
              type="password"
              placeholder="Подтверждение пароля"
            />
            <div className="termsOfUse">
              <div className="checkBox">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleTermsOfUse}
                />
              </div>
              <div className="titleTermsOfUse">
                <h1>Пользовательское соглашение</h1>
              </div>
              <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                agreement={handleAgreement}
              />
            </div>
            <RecaptchaChange onChange={handleRecaptchaChange} />
            <button className="btn btn-block">Зарегистрироваться</button>
            <p className="message">
              Уже зарегистрирован? <Link to="/login">Войти</Link>
            </p>
          </div>
        </form>
        {/* <div className="aion__logo">
                    <div className="logo"></div>
                </div> */}
      </div>
    </div>
  );
}
