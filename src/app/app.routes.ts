import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { LogoutComponent } from './features/logout/logout.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { UserComponent } from './features/user/user.component';
import { ProductComponent } from './features/product/product.component';
import { authGuard } from './core/auth.guard';

export const routeNames = {
    home: {
        path: 'home',
        title: "Home",
        component: HomeComponent,
    },
    login: {
        path: '',
        title: "Login",
        component: LoginComponent,
    },
    logout: {
        path: 'logout',
        title: "Logout",
        component: LogoutComponent,
    },
    forgotPassword: {
        path: 'forgot-password',
        title: "Forgot Password",
        component: ForgotPasswordComponent,
    },
    user: {
        path: 'user',
        title: "Users",
        component: UserComponent,
    },
    product: {
        path: 'product',
        title: "Products",
        component: ProductComponent,
    },
}

export const routes: Routes = [
    {
        path: routeNames.home.path,
        component: routeNames.home.component,
        title: `Admin | ${routeNames.home.title}`,
        canActivate: [authGuard],
    },
    {
        path: routeNames.login.path,
        component: routeNames.login.component,
        title: `Admin | ${routeNames.login.title}`,
        // canActivate: [authGuard],
    },
    {
        path: routeNames.logout.path,
        component: routeNames.logout.component,
        title: `Admin | ${routeNames.logout.title}`,
        // canActivate: [authGuard],
    },
    {
        path: routeNames.forgotPassword.path,
        component: routeNames.forgotPassword.component,
        title: `Admin | ${routeNames.forgotPassword.title}`,
        // canActivate: [authGuard],
    },
    {
        path: routeNames.user.path,
        component: routeNames.user.component,
        title: `Admin | ${routeNames.user.title}`,
        canActivate: [authGuard],
    },
    {
        path: routeNames.product.path,
        component: routeNames.product.component,
        title: `Admin | ${routeNames.product.title}`,
        canActivate: [authGuard],
    },
];
