import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { AuthContextProvider } from './auth';
//import { GlobalStoreContextProvider } from './store'
import {
    NavigationBar,
    HomeScreen,
} from './components'
/*
    This is our application's top-level component and entry-point
    for our application.
    
    @author Eric Grunblatt
*/
const App = () => {
    return (
        <BrowserRouter>
            {/*<AuthContextProvider>
                <GlobalStoreContextProvider>  */}            
                    <NavigationBar />
                    <Switch>
                        <Route path="/" exact component={HomeScreen} />
                    </Switch>
                    {/*<Statusbar />
                </GlobalStoreContextProvider>
                </AuthContextProvider>*/}
        </BrowserRouter>
    )
}

export default App