import {
    faBullhorn,
    faBurger,
    faCalendarCheck,
    faCalendarDays,
    faChartColumn,
    faClapperboard,
    faFilm,
    faMasksTheater,
    faMoneyBill1Wave,
    faMoneyCheckDollar,
    faNewspaper,
    faPrint,
    faStopwatch,
    faStore,
    faTag,
    faTicket,
    faTv,
    faUser,
    faUsersRectangle,
    faUserTie,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        [{ color: [] }, { background: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
    ],
};

export const fomarts = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'align',
    'color',
    'background',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
];

export const standardAge = [
    'P - Thích hợp cho mọi độ tuổi',
    'K - Người xem dưới 13 tuổi với điều kiện xem cùng cha mẹ hoặc người giám hộ',
    'T13 - Cấm người dưới 13 tuổi',
    'T16 - Cấm người dưới 16 tuổi',
    'T18 - Cấm người dưới 18 tuổi',
    'C - Phim không được phép phổ biến',
];

export const signAge = [
    'P',
    'K',
    'T13',
    'T16',
    'T18',
    'C',
];

export const typeRoom = [
    '2D',
    '3D',
    'IMAX',
    // 'T16 - Cấm người dưới 16 tuổi',
];

export const typeSeat = [
    'Ghế thường',
    'Ghế VIP',
    'Ghế Couple',
    // 'T16 - Cấm người dưới 16 tuổi',
];

export const typeSeatEnum = {
    0: 'Ghế thường',
    1: 'Ghế VIP',
    2: 'Ghế Couple',
};

export const showToast = (message, type) => {
    toast(message, {
        position: 'top-center',
        autoClose: 2000,
        type: type,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export const itemMenu = [
    {
        index: 1,
        icon: faMasksTheater,
        name: 'Thể loại phim',
        link: '/genre',
    },
    {
        index: 2,
        icon: faFilm,
        name: 'Phim',
        link: '/film',
    },
    {
        index: 3,
        icon: faClapperboard,
        name: 'Đạo diễn',
        link: '/director',
    },
    {
        index: 4,
        icon: faUsersRectangle,
        name: 'Diễn viên',
        link: '/performer',
    },
    {
        index: 5,
        icon: faBurger,
        name: 'Thức ăn',
        link: '/food',
    },
    {
        index: 6,
        icon: faUtensils,
        name: 'Combo',
        link: '/combo',
    },
    {
        index: 7,
        icon: faTag,
        name: 'Mã khuyến mãi',
        link: '/discount',
    },
    {
        index: 8,
        icon: faUser,
        name: 'Người dùng',
        link: '/user',
    },
    {
        index: 9,
        icon: faTv,
        name: 'Rạp phim',
        link: '/theater',
    },
    {
        index: 10,
        icon: faUserTie,
        name: 'Nhân viên',
        link: '/staff',
    },
    {
        index: 11,
        icon: faMoneyBill1Wave,
        name: 'Giá vé',
        link: '/ticket-price',
    },
    {
        index: 12,
        icon: faCalendarDays,
        name: 'Lịch chiếu',
        link: '/schedule',
    },
    {
        index: 13,
        icon: faStopwatch,
        name: 'Suất chiếu',
        link: '/showtime',
    },
    {
        index: 14,
        icon: faMoneyCheckDollar,
        name: 'Đặt vé',
        link: '/book-tickets',
    },
    {
        index: 15,
        icon: faStore,
        name: 'Đặt combo, bắp nước',
        link: '/order-food',
    },
    {
        index: 16,
        icon: faTicket,
        name: 'Danh sách vé',
        link: '/list-order',
    },
    {
        index: 17,
        icon: faPrint,
        name: 'In vé',
        link: '/print-ticket',
    },
    {
        index: 18,
        icon: faChartColumn,
        name: 'Thống kê',
        link: '/',
    },
    {
        index: 19,
        icon: faBullhorn,
        name: 'Quảng cáo',
        link: '/advertisement',
    },
    {
        index: 20,
        icon: faCalendarCheck,
        name: 'Sự kiện',
        link: '/event',
    },
    {
        index: 21,
        icon: faNewspaper,
        name: 'Tin tức',
        link: '/news',
    },
    {
        index: 22,
        icon: faNewspaper,
        name: 'Hỗ trợ',
        link: '/chat',
    },
];

export const timePrice = {
    0: 'Thứ 2 đến thứ 5 trước 17h',
    1: 'Thứ 2 đến thứ 5 sau 17h',
    2: 'Thứ 6 đến chủ nhật trước 17h',
    3: 'Thứ 6 đến chủ nhật sau 17h',
};

export const typeUserPrice = {
    0: 'Học sinh, sinh viên',
    1: 'Người lớn',
    2: 'Người già, trẻ em',
    3: 'Thành viên, vé trực tuyến',
};

export const typeSurcharge = {
    0: '3D',
    1: 'IMAX',
    2: 'Ghế VIP',
    3: 'Ghế Couple',
};

export const typeShowTime = {
    0: 'Theo lịch',
    1: 'Chiếu sớm',
};

export const statusShowTime = {
    0: 'Đã chiếu',
    1: 'Đang chiếu',
    2: 'Sắp chiếu',
};

export const nameDay = {
    0: 'Chủ nhật',
    1: 'Thứ 2',
    2: 'Thứ 3',
    3: 'Thứ 4',
    4: 'Thứ 5',
    5: 'Thứ 6',
    6: 'Thứ 7',
};

export const allTranslate = ['Phụ đề', 'Lồng tiếng', 'Thuyết minh'];

export const useQueryParams = () => {
    const location = useLocation();
    return useMemo(() => new URLSearchParams(location.search), [location.search]);
};

export const typePay = {
    0: 'Chờ thanh toán',
    1: 'Thanh toán thành công',
    2: 'Thanh toán không thành công',
}

export const statusTicket = {
    0: 'Vé không hợp lệ',
    1: 'Vé hợp lệ',
}

export const typeStatistical = {
    0: '7 ngày gần nhất',
    1: 'Tháng này',
    2: 'Tháng trước',
    3: 'Trong năm'
}