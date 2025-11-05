import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

export default [index('routes/home.tsx')] satisfies RouteConfig;
