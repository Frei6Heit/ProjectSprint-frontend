import React, { useState } from 'react';
import styles from './Auth.module.scss';
import { User, Lock, EyeOff, Eye } from 'lucide-react';
import groupSvg from './assets/Group.svg';
import Avatar11 from './assets/Vector.svg';


type AuthMode = 'login' | 'register';

interface ErrorsState {
  login?: string;
  password?: string;
  passwordRepeat?: string;
}

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<ErrorsState>({});

  const validate = (): boolean => {
    const newErrors: ErrorsState = {};
    let isValid = true;

    if (!login.trim()) {
      newErrors.login = 'Поле логин обязательно';
      isValid = false;
    } else if (login.length < 3) {
      newErrors.login = 'Логин должен содержать минимум 3 символа';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Введите пароль';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Пароль слишком короткий';
      isValid = false;
    }

    if (mode === 'register') {
      if (!passwordRepeat) {
        newErrors.passwordRepeat = 'Повторите пароль';
        isValid = false;
      } else if (password !== passwordRepeat) {
        newErrors.passwordRepeat = 'Пароли не совпадают';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Данные валидны, отправка на сервер...', { login, password });
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setLogin('');
    setPassword('');
    setPasswordRepeat('');
    setErrors({});
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftSide}>
        {/* Круг 1: Самый нижний (светло-серый) */}
        <div className={`${styles.circle} ${styles.circleLight}`}></div>

        {/* Круг 2: Средний (серый) */}
        <div className={`${styles.circle} ${styles.circleMedium}`}></div>

        {/* Круг 3: Верхний (темный) с узором */}
        <div className={`${styles.circle} ${styles.circleDark}`}>
          <img src={groupSvg} alt="pattern" className={styles.patternIcon} />
        </div>
      </div>


      <div className={styles.rightSide}>
        <div className={styles.card}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarIcon}>
              <img src={Avatar11} alt="User Avatar" className={styles.avatarImage} />
            </div>
          </div>

          <h2 className={styles.title}>
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </h2>

          <div className={styles.subtitle}>
            {mode === 'login' ? 'Нет учётной записи? ' : 'Есть учётная запись? '}
            <button type="button" onClick={toggleMode}>
              {mode === 'login' ? 'Регистрация' : 'Вход'}
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>


            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <User />
                <input
                  type="text"
                  placeholder="Логин"
                  value={login}
                  onChange={(e) => {
                    setLogin(e.target.value);
                    if (errors.login) setErrors({ ...errors, login: undefined });
                  }}
                  className={`${styles.input} ${errors.login ? styles.error : ''}`}
                />
              </div>
              {errors.login && <span className={styles.errorText}>{errors.login}</span>}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <Lock />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  className={`${styles.input} ${errors.password ? styles.error : ''}`}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            {mode === 'register' && (
              <div className={styles.formGroup}>
                <div className={styles.inputWrapper}>
                  <Lock />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Повторите пароль"
                    value={passwordRepeat}
                    onChange={(e) => {
                      setPasswordRepeat(e.target.value);
                      if (errors.passwordRepeat) setErrors({ ...errors, passwordRepeat: undefined });
                    }}
                    className={`${styles.input} ${errors.passwordRepeat ? styles.error : ''}`}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {errors.passwordRepeat && <span className={styles.errorText}>{errors.passwordRepeat}</span>}
              </div>
            )}

            {mode === 'login' && (
              <label className={styles.checkboxGroup}>
                <input type="checkbox" />
                Запомнить меня
              </label>
            )}

            <button type="submit" className={styles.submitBtn}>
              Продолжить
            </button>
            <div style={{ clear: 'both' }}></div>

            {mode === 'login' && (
              <div className={styles.footerLinks}>
                Забыли логин или пароль?
                <a href="#recover">Восстановить</a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};