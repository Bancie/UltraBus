import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';

export default [
  route('/', 'routes/homepage.tsx'),
  route('/dashboard', 'routes/App.tsx'),
] satisfies RouteConfig;
