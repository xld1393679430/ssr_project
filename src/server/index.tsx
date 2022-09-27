/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import childProcess from "child_process";
import { renderToString } from "react-dom/server";
import { matchRoutes, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";
import path from "path";
import { Provider } from "react-redux";
import router from "@/router";
import { serverStore } from "@/store";
import { PORT, API } from '@/utils'

const bodyParser = require("body-parser");
const app = express();

app.use(express.static(path.resolve(process.cwd(), "client_build")));

// 请求body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 启动一个post服务
app.post("/api/getDemoData", (req, res) => {
  setTimeout(() => {
    res.send({
      data: req.body,
      status_code: 0,
    });
  }, 1000);
});

app.get("*", (req, res) => {
  const routerMap = new Map();
  router.forEach((item) => {
    if (item.path && item.loadData) {
      routerMap.set(item.path, item.loadData(serverStore));
    }
  });

  // 匹配当前路由的router
  const matchedRoutes = matchRoutes(router, req.path) || [];

  const promises: any = [];
  matchedRoutes.forEach((item) => {
    if (routerMap.has(item.pathname)) {
      promises.push(routerMap.get(item.pathname));
    }
  });

  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={serverStore}>
        <StaticRouter location={req.path}>
          <Routes>
            {router?.map((item, index) => {
              return <Route {...item} key={index} />;
            })}
          </Routes>
        </StaticRouter>
      </Provider>
    );

    const helmet = Helmet.renderStatic();
    res.send(`
          <html>
              <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
              </head>
              <body>
                  <div id="root">${content}</div>
                  <script>
                    window.context = {
                      state: ${JSON.stringify(serverStore.getState())}
                    }
                  </script>
                  <script src="/index.js"></script>
              </body>
          </html>
      `);
  });
});

app.listen(PORT, () => {
  console.log('====================================');
  console.log(`${API}:${PORT}`);
  console.log('====================================');
});

childProcess.exec(`---START ${API}:${PORT} ---`);
