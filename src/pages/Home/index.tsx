import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { Fragment } from "react";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="我是首页" />
      </Helmet>
      <h1>hello-ssr</h1>
      <button
        onClick={() => {
          alert("hello-ssr");
        }}
      >
        alert
      </button>

      <div>
        <a href="/demo">链接跳转</a>
        <button
          onClick={(): void => {
            navigate("/demo");
          }}
        >
          路由跳转
        </button>
      </div>
    </Fragment>
  );
};

export default Home;
