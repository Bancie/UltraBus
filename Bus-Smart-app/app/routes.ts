import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', 'routes/auth/App.tsx'),
  route('/home', 'routes/home.tsx'),
] satisfies RouteConfig;
