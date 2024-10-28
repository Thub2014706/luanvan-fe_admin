import OrderComboSuccess from '~/components/OrderComboSuccess/OrderComboSuccess';
import OrderTicketSuccess from '~/components/OrderTicketSuccess/OrderTicketSuccess';
import AddFilmPage from '~/pages/AddFilmPage/AddFilmPage';
import AddPerformerPage from '~/components/AddPerformer/AddPerformer';
import BookTicketsPage from '~/pages/BookTicketsPage/BookTicketsPage';
import ComboPage from '~/pages/ComboPage/ComboPage';
import DirectorPage from '~/pages/DirectorPage/DirectorPage';
import DiscountPage from '~/pages/DiscountPage/DiscountPage';
import FilmPage from '~/pages/FilmPage/FilmPage';
import FoodPage from '~/pages/FoodPage/FoodPage';
import GenrePage from '~/pages/GenrePage/GenrePage';
import HomePage from '~/pages/HomePage/HomePage';
import ListOrderPage from '~/pages/ListOrderPage/ListOrderPage';
import LoginPage from '~/pages/LoginPage/LoginPage';
import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';
import OrderFoodPage from '~/pages/OrderFoodPage/OrderFoodPage';
import PerformerPage from '~/pages/PerformerPage/PerformerPage';
import RoomPage from '~/pages/RoomPage/RoomPage';
import SchedulePage from '~/pages/SchedulePage/SchedulePage';
import ShowTimePage from '~/pages/ShowTimePage/ShowTimePage';
import StaffPage from '~/pages/StaffPage/StaffPage';
import TheaterPage from '~/pages/TheaterPage/TheaterPage';
import TicketPricePage from '~/pages/TicketPricePage/TicketPricePage';
import UserPage from '~/pages/UserPage/UserPage';
import PrintTicketPage from '~/pages/PrintTicketPage/PrintTicketPage';
import StatisticalPage from '~/pages/StatisticalPage/StatisticalPage';
import AdvertisementPage from '~/pages/AdvertisementPage/AdvertisementPage';
import EventPage from '~/pages/EventPage/EventPage';
import NewsPage from '~/pages/NewsPage/NewsPage';
import ChatPage from '~/pages/ChatPage/ChatPage';
import InformationPage from '~/pages/InformationPage/InformationPage';
import ScanTicketPage from '~/pages/ScanTicketPage/ScanTicketPage';

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
        path: '/combo',
        component: ComboPage,
    },

    {
        path: '/discount',
        component: DiscountPage,
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
        path: '/theater/room/:id',
        component: RoomPage,
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
        path: '/list-order',
        component: ListOrderPage,
    },

    {
        path: '/print-ticket',
        component: PrintTicketPage,
    },

    {
        path: '/statistical',
        component: StatisticalPage,
    },
    {
        path: '/advertisement',
        component: AdvertisementPage,
    },
    {
        path: '/event',
        component: EventPage,
    },
    {
        path: '/news',
        component: NewsPage,
    },
    {
        path: '/chat',
        component: ChatPage,
    },
    {
        path: '/information',
        component: InformationPage,
    },
    {
        path: '/scan-ticket',
        component: ScanTicketPage,
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
