import { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from './store/store';
import { appRoutes, navRoutes } from './routes';
import { Header, SideBar } from './components/layout';
import './App.css';
import AuthRoute from './routes/AuthRoute';

import {
  ModalComponent as Modal,
  NotificationComponent as Notification,
  ToastComponent as Toast
} from './components/common';

const App = () => {

  const [sideBarOpen, setSideBarOpen] = useState(false);
  // const [headerVisibility, setHeaderVisibility] = useState(false);

  const { isAuthUser } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const { modalData } = useSelector<RootState, RootState['modal']>(
    (state) => state.modal,
  );
  const { toastData } = useSelector<RootState, RootState['toast']>(
    (state) => state.toast,
  );
  const { notificationData } = useSelector<RootState, RootState['notification']>(
    (state) => state.notification,
  );

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-yellow-100 App">
      <Modal
        isOpen={modalData?.isOpen}
        setisOpen={modalData?.setisOpen}
        title={modalData?.title}
        img={modalData?.img}
        contentText={modalData?.contentText}
        cancelButton={modalData?.cancelButton}
        defaultButton={modalData?.defaultButton}
        colorDB={modalData?.colorDB}
        onClickDB={modalData?.onClickDB}
        typeButton={modalData?.typeButton}
        colorTYB={modalData?.colorTYB}
        onClickTYB={modalData?.onClickTYB}
      />
      <Toast
        isOpen={toastData?.isOpen}
        setisOpen={toastData?.setisOpen}
        contentText={toastData?.contentText}
        color={toastData?.color}
        delay={toastData?.delay}
      />
      <Notification
        isOpen={notificationData?.isOpen}
        setisOpen={notificationData?.setisOpen}
        title={notificationData?.title}
        theadData={notificationData?.theadData}
        tbodyData={notificationData?.tbodyData}
        contentObj={notificationData?.contentObj}
        titleContent={notificationData?.titleContent}
        contentText={notificationData?.contentText}
      />
      <Router>
        {isAuthUser && <Header navToggle={setSideBarOpen} />}
        <SideBar routes={navRoutes} isOpen={sideBarOpen} activeColor="green"/>
        <div
          className="h-full bg-yellow-100"
          onClick={() => {
            if (sideBarOpen) setSideBarOpen(false);
          }}
        >
          <Switch>
            {appRoutes.map(({ path, component, exact, type, roles }) => (
              <AuthRoute
                exact={exact}
                path={path}
                component={component}
                type={type}
                key={path}
                roles={roles}
              />
            ))}
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
