/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, Fragment } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { getDemoData } from "@/store/demoReducer";

interface IProps {
  content?: string;
  getDemoData?: (data: string) => void;
}

const Demo: FC<IProps> = ({ content, getDemoData }) => {
  return (
    <Fragment>
      <Helmet>
        <title>Demo</title>
      </Helmet>

      <div>
        <p>这是一个demo页面1</p>
      </div>

      <div>content： {content}</div>
      <button
        onClick={() => {
          getDemoData && getDemoData("刷新过后的数据");
        }}
      >
        刷新
      </button>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    content: state?.demo?.content,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDemoData: (data: string) => {
      dispatch(getDemoData(data));
    },
  };
};

const storeDemo: any = connect(mapStateToProps, mapDispatchToProps)(Demo)

storeDemo.getInitProps = (store: any, data: any) => {
  return store.dispatch(getDemoData(data || "默认的数据哈哈哈"))
}

export default storeDemo;
