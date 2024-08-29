import { lazy } from "react";

const Multi = lazy(() => import('./multi/Multi'));
const Header = lazy(() => import('./header/Header'));
const Home = lazy(() => import('./home/Home'));
const Custom = lazy(() => import('./custom/Custom'));
const Solo = lazy(() => import('./solo/Solo'));

export {
	Header,
	Multi,
	Home,
	Custom,
	Solo
};
