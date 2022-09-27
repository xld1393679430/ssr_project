import { FC, Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

const Demo: FC = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.post("/api/getDemoData", {
      content: "这是一个Demo页面",
    }).then(res => {
      setContent(res?.data?.data?.content)
    })
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Demo</title>
      </Helmet>

      <div>
        <p>这是一个demo页面1</p>
      </div>

      <div>content： {content}</div>
    </Fragment>
  );
};

export default Demo;
