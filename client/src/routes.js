//================================================================
// client/src/routes.js
//================================================================
import Homepage from './components/Homepage';
import AboutUs from './components/AboutUs';
import Languages from './components/Languages';
import CplusPluses from './components/Languages/CplusPluses';
import Javas from './components/Languages/Javas';
import JavaScripts from './components/Languages/JavaScripts';
import Pythons from './components/Languages/Pythons';
import QuickReferences from './components/QuickReferences';
import Users from './components/Users';

// import  from './components/';

const routes = [
    {
        path: '/',
        component: <Homepage />,
        exact: true
    },
    {
        path: '/about-us',
        component: <AboutUs />
    },
    {
        path: '/languages',
        component: <Languages />
    },
    {
        path: '/languages/cplusplus',
        component: <CplusPluses />
    },
    {
        path: '/languages/java',
        component: <Javas />
    },
    {
        path: '/languages/javascript',
        component: <JavaScripts />
    },
    {
        path: '/languages/python',
        component: <Pythons />
    },
    {
        path: '/languages/quick-references',
        component: <QuickReferences />
    },
    {
        path: '/user',
        component: <Users />
    }
]

export default routes;
/*
,
    {
        path: '/',
        component: </>
    }
*/