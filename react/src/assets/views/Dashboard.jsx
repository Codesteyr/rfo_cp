import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useEffect, useState } from "react";
import { format } from "@formkit/tempo";

export default function Dashboard() {
  const {
    user,
    account,
    setUser,
    setToken,
    setAccount,
    persons,
    setPersons,
    isLoading,
  } = useStateContext();

  const [selectedPerson, setSelectedPerson] = useState("");
  const [classIcon, setClassIcon] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [animateClass, setAnimateClass] = useState(false);

  const currentDate = new Date();
  const expireDate = new Date(account.expire);
  const isNotExpired = expireDate > currentDate;

  useEffect(() => {
    // При изменении selectedPerson установите класс анимации
    setAnimateClass(true);

    // Очистите класс анимации после завершения анимации (1 секунда)
    const timeoutId = setTimeout(() => {
      setAnimateClass(false);
    }, 500);

    // Очистите таймаут при размонтировании компонента или при следующем изменении selectedPerson
    return () => clearTimeout(timeoutId);
  }, [selectedPerson]);

  const selectPerson = (ev) => {
    const selectedPersonId = ev.target.value;
    setSelectedPerson(selectedPersonId);

    // Получите значение class_icon из атрибута data-classicon
    const selectedClassIcon =
      ev.target.options[ev.target.selectedIndex].getAttribute("data-classicon");

    // Установите имя файла изображения в стейт
    setClassIcon(selectedClassIcon);
  };

  const RepairHero = (ev) => {
    ev.preventDefault();

    const personId = {
      id: selectedPerson,
    };
    axiosClient
      .post("/repairPerson", personId)
      .then(({ data }) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setError(response.data.message);
          setSuccess("");
        }
      });
  };

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setAccount({});
      setToken(null);
      setPersons({});
    });
  };

  return (
    <div className="container">
      <div className="controlPanel">
        <div className="panel--row">
          <div className="main--panel ">
            <div className="account--information-board fadeinleft">
              <div className="account">
                <div className="username--title">
                  <p>USERNAME</p>
                </div>
                <div className="account--table">
                  <div className="account--information">
                    <h2>Создан: 8 марта, 2024 21:12</h2>
                    <h2>Последний вход: 8 марта, 2024 22:20</h2>
                  </div>
                  <div className="account--information">
                    <h2>Создан: 8 марта, 2024 21:12</h2>
                    <h2>Последний вход: 8 марта, 2024 22:20</h2>
                  </div>
                </div>
              </div>
              <div className="account--detailed ">
                <div className="detailed--card">
                  <div className="account--info">
                    <div className="race--icon"></div>
                    <div className="account--board">
                      <div className="account-name">
                        <p>ACCOUNT NAME</p>
                        <h2>OC: 1000</h2>
                      </div>
                      <div className="account-desc">
                        <p>RANGER</p>
                        <h2>65 LVL</h2>
                      </div>
                    </div>
                  </div>
                  <div className="repair--account">
                    <button className="blick">
                      {" "}
                      <p>ПОЧИНИТЬ ПЕРСОНАЖА</p>
                    </button>
                  </div>
                </div>
                <div className="detailed--card">
                  <div className="account--info">
                    <div className="race--icon"></div>
                    <div className="account--board">
                      <div className="account-name">
                        <p>ACCOUNT NAME</p>
                        <h2>OC: 1000</h2>
                      </div>
                      <div className="account-desc">
                        <p>RANGER</p>
                        <h2>65 LVL</h2>
                      </div>
                    </div>
                  </div>
                  <div className="repair--account">
                    <button className="blick">
                      {" "}
                      <p>ПОЧИНИТЬ ПЕРСОНАЖА</p>
                    </button>
                  </div>
                </div>
                <div className="detailed--card">
                  <div className="account--info">
                    <div className="race--icon"></div>
                    <div className="account--board">
                      <div className="account-name">
                        <p>ACCOUNT NAME</p>
                        <h2>OC: 1000</h2>
                      </div>
                      <div className="account-desc">
                        <p>RANGER</p>
                        <h2>65 LVL</h2>
                      </div>
                    </div>
                  </div>
                  <div className="repair--account">
                    <button className="blick">
                      {" "}
                      <p>ПОЧИНИТЬ ПЕРСОНАЖА</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rating fadeinright">
              <div className="rating--title">
                <h2>РЕЙТИНГ</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
