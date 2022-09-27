import { FC, Fragment } from "react";
import { Helmet } from "react-helmet";

const Demo: FC = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Demo</title>
      </Helmet>

      <div>
        <p>这是一个demo页面1</p>
      </div>
    </Fragment>
  );
};

export default Demo;
