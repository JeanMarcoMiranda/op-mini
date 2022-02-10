import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from './store/store';
import { appRoutes, navRoutes } from './routes';
import { Header, SideBar } from './components/layout';
import './App.css';
import AuthRoute from './routes/AuthRoute';
import { setUserData, setToken, setAuthUser } from './store/action/actions';

import {
  ModalComponent as Modal,
  NotificationComponent as Notification,
  ToastComponent as Toast
} from './components/common';

const initialUserRole: IRole = {
  _id: '',
  name: '',
  isActive: false,
  description: '',
};

const initialUserState: IUserData = {
  _id: '',
  name: '',
  email: '',
  documentType: '',
  documentNumber: '',
  isActive: false,
  role: initialUserRole,
};

const App = () => {

  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

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

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const getProductData = async () => {
      const url = "http://localhost:8000/cash";
      const requestInit: RequestInit = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const res = await fetch(url, requestInit);
      if (res.status === 404){
        localStorage.removeItem('user')
        localStorage.removeItem('token')

        dispatch(setUserData(initialUserState))
        dispatch(setAuthUser(false))
        dispatch(setToken(''))
        history.push('/login')
      }
    };
    getProductData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-yellow-100 App">
      <Modal
        isOpen={modalData?.isOpen}
        setisOpen={modalData?.setisOpen}
        title={modalData?.title}
        img={modalData?.img}
        contentText={modalData?.contentText}
        contentObj={modalData?.contentObj}
        cancelButton={modalData?.cancelButton}
        defaultButton={modalData?.defaultButton}
        colorDB={modalData?.colorDB}
        onClickDB={modalData?.onClickDB}
        typeButton={modalData?.typeButton}
        colorTYB={modalData?.colorTYB}
        onClickTYB={modalData?.onClickTYB}
        inpComplete={modalData?.inpComplete}
        onClickOrdCompl={modalData?.onClickOrdCompl}
        numOrdCompl={modalData?.numOrdCompl}
        shiftComplete={modalData?.shiftComplete}
        onClickShiftCompl={modalData?.onClickShiftCompl}
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
