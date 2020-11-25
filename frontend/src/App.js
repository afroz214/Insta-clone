import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import store from './store'
import Home from './Screen/Home'
import Profile from './Screen/Profile'
import NewsFeeds from './Screen/NewsFeeds'
import CreatePost from './Screen/CreatePost'
import UserProfile from './Screen/UserProfile'
import SinglePost from './Screen/SinglePost'
import UserPhoto from './Screen/UserPhoto'
import UserUpdate from './Screen/UserUpdate'
import ChangePassword from './Screen/ChangePassword'


const App = () => {
  return <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/newsfeeds" exact component={NewsFeeds} />
      <Route path="/create-post" exact component={CreatePost} />
      <Route path="/profile/:id" exact component={UserProfile} />
      <Route path="/post/:id" exact component={SinglePost} />
      <Route path="/edit-photo" exact component={UserPhoto} />
      <Route path="/edit-profile" exact component={UserUpdate} />
      <Route path="/change-password" exact component={ChangePassword} />
    </BrowserRouter>
  </Provider>
}

export default App
