import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';

export default [
  route('/', 'routes/homepage.tsx'),
  route('/manage', 'routes/App.tsx'),
] satisfies RouteConfig;
