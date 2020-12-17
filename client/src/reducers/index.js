import { combineReducers } from 'redux';

//import the reducers you added
import posts from './posts.js'

//Usually { posts: posts }, { key : value }
//Since the key and value are the same, so > posts
export default combineReducers ({ posts });