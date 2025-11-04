import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('QuanLyApp', 'routes/QuanLyApp.tsx'),
] satisfies RouteConfig;
