import React from 'react'
import { Layout } from 'react-admin';
import AppMenu from './AppMenu';
// import MyAppBar from './MyAppBar';
// import MySidebar from './MySidebar';
// import MyMenu from './MyMenu';
// import MyNotification from './MyNotification';

const MyLayout = props => <Layout
    {...props}
    // appBar={MyAppBar}
    // sidebar={MySidebar}
    menu={AppMenu}
    // notification={MyNotification}
/>;

export default MyLayout;
