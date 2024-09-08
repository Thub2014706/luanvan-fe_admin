import OrderComboSuccess from '~/components/OrderComboSuccess/OrderComboSuccess';
import OrderTicketSuccess from '~/components/OrderTicketSuccess/OrderTicketSuccess';
import AddComboPage from '~/pages/AddComboPage/AddComboPage';
import AddDirectorPage from '~/pages/AddDirectorPage/AddDirectorPage';
import AddDiscountPage from '~/pages/AddDiscountPage/AddDiscountPage';
import AddFilmPage from '~/pages/AddFilmPage/AddFilmPage';
import AddFoodPage from '~/pages/AddFoodPage/AddFoodPage';
import AddPerformerPage from '~/pages/AddPerformerPage/AddPerformerPage';
import AddTheaterPage from '~/pages/AddTheaterPage/AddTheaterPage';
import BookTicketsPage from '~/pages/BookTicketsPage/BookTicketsPage';
import ComboPage from '~/pages/ComboPage/ComboPage';
import DirectorPage from '~/pages/DirectorPage/DirectorPage';
import DiscountPage from '~/pages/DiscountPage/DiscountPage';
import FilmPage from '~/pages/FilmPage/FilmPage';
import FoodPage from '~/pages/FoodPage/FoodPage';
import GenrePage from '~/pages/GenrePage/GenrePage';
import HomePage from '~/pages/HomePage/HomePage';
import LoginPage from '~/pages/LoginPage/LoginPage';
import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';
import OrderFoodPage from '~/pages/OrderFoodPage/OrderFoodPage';
import PerformerPage from '~/pages/PerformerPage/PerformerPage';
import SchedulePage from '~/pages/SchedulePage/SchedulePage';
import ShowTimePage from '~/pages/ShowTimePage/ShowTimePage';
import StaffPage from '~/pages/StaffPage/StaffPage';
import TheaterPage from '~/pages/TheaterPage/TheaterPage';
import TicketPricePage from '~/pages/TicketPricePage/TicketPricePage';
import UserPage from '~/pages/UserPage/UserPage';

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/genre',
        component: GenrePage,
    },
    {
        path: '/film',
        component: FilmPage,
    },
    {
        path: '/film/add',
        component: AddFilmPage,
    },
    {
        path: '/film/update/:id',
        component: AddFilmPage,
    },
    {
        path: '/director',
        component: DirectorPage,
    },
    {
        path: '/director/add',
        component: AddDirectorPage,
    },
    {
        path: '/director/update/:id',
        component: AddDirectorPage,
    },

    {
        path: '/performer',
        component: PerformerPage,
    },
    {
        path: '/performer/add',
        component: AddPerformerPage,
    },
    {
        path: '/performer/update/:id',
        component: AddPerformerPage,
    },

    {
        path: '/food',
        component: FoodPage,
    },
    {
        path: '/food/add',
        component: AddFoodPage,
    },
    {
        path: '/food/update/:id',
        component: AddFoodPage,
    },

    {
        path: '/combo',
        component: ComboPage,
    },
    {
        path: '/combo/add',
        component: AddComboPage,
    },
    {
        path: '/combo/update/:id',
        component: AddComboPage,
    },

    {
        path: '/discount',
        component: DiscountPage,
    },
    {
        path: '/discount/add',
        component: AddDiscountPage,
    },
    {
        path: '/discount/update/:id',
        component: AddDiscountPage,
    },
    {
        path: '/user',
        component: UserPage,
    },

    {
        path: '/theater',
        component: TheaterPage,
    },
    {
        path: '/theater/add',
        component: AddTheaterPage,
    },
    {
        path: '/theater/update/:id',
        component: AddTheaterPage,
    },

    {
        path: '/staff',
        component: StaffPage,
    },

    {
        path: '/ticket-price',
        component: TicketPricePage,
    },

    {
        path: '/schedule',
        component: SchedulePage,
    },

    {
        path: '/showtime',
        component: ShowTimePage,
    },

    {
        path: '/book-tickets',
        component: BookTicketsPage,
    },

    {
        path: '/book-tickets/success',
        component: OrderTicketSuccess,
    },
    {
        path: '/order-food/success',
        component: OrderComboSuccess,
    },

    {
        path: '/order-food',
        component: OrderFoodPage,
    },

    {
        path: '/*',
        component: NotFoundPage,
        layout: null,
    },
];

const authRoutes = [
    {
        path: '/sign-in',
        component: LoginPage,
        layout: null,
    },
];

export { routes, authRoutes };
