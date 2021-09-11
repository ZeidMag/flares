import './Login.scss';
import loginImage from '../../assets/images/login-image.png';

const Login = () => {
  return (
    <main className="login-container primary-font">
      <section className="login-right-section">
        <article className="login-content">
          <h1 className="login-welcome-header__main">مرحبا بعودتك !</h1>
          <h4 className="login-welcome-header__secondary">
            قم بتسجيل الدخول لتتمتع بكل مزايا فلير!
          </h4>
          <label htmlFor="username">اسم المستخدم</label>
          <input
            type="text"
            name="username"
            className="login-input"
            autoFocus
          />
          <label htmlFor="password">كلمة السر</label>
          <input name="password" type="password" className="login-input" />
          <div className="flex">
            <input type="checkbox" name="rememberMe" id="rememberMe" />
            <label htmlFor="rememberMe">تذكرني</label>
          </div>
          <button>تسجيل الدخول</button>
        </article>
      </section>
      <section className="login-left-section">
        <div className="login-image-container">
          <img src={loginImage} alt="macbook" />
        </div>
        <div className="login-top-left-label">
          <h1>Flare</h1>
        </div>
      </section>
    </main>
  );
};

export default Login;
