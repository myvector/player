import PlayerControl from '~p/playerControl';
import Search from '~p/search/';
import TrackList from '~p/trackList/';
import E404 from '~p/404/';
import Equalizer from '~p/equalizer/';
import PlayList from '~p/playList/';
import trackListInPlayList from '~p/trackListInPlayList/';
import InfoTrack from '~p/infoTrack/';
import Visualization from '~p/visualization/';
import About from '~p/about/';

let routeList = [
  {
    name: 'home',
    component: TrackList,
    path: '/',
    exact: true,
  },
  {
    name: 'play',
    component: PlayerControl,
    path: '/play/:id',
    exact: true,
  },
  {
    name: 'search',
    component: Search,
    path: '/search',
    exact: true,
  },
  {
    name: 'equalizer',
    component: Equalizer,
    path: '/equalizer',
    exact: true,
  },
  {
    name: 'playList',
    component: trackListInPlayList,
    path: '/playlist/:id',
    exact: true,
  },
  {
    name: 'playList',
    component: PlayList,
    path: '/playlist',
    exact: true,
  },
  {
    name: 'infoTrack',
    component: InfoTrack,
    path: '/info',
    exact: true,
  },
  {
    name: 'vis',
    component: Visualization,
    path: '/visualization',
    exact: true,
  },
  {
    name: 'about',
    component: About,
    path: '/about',
    exact: true,
  },
  {
    component: E404,
    path: '**',
  },
];

let routeMap = {};

routeList.map((route) => {
  if (route.hasOwnProperty('name')) {
    return (routeMap[route.name] = route.path);
  }
});

let urlBuilder = (name, params, childMask) => {
  if (routeMap.hasOwnProperty('name')) {
    return null;
  }

  let url = childMask ? routeMap[name] + '/:id' : routeMap[name];

  for (let key in params) {
    return url.replace(':' + key, params[key]);
  }
};
export default routeList;
export { urlBuilder, routeMap };
