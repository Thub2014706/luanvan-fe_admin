import {
    faBurger,
    faCalendarDays,
    faClapperboard,
    faFilm,
    faMasksTheater,
    faMoneyBill1Wave,
    faStopwatch,
    faTag,
    faTv,
    faUser,
    faUsersRectangle,
    faUserTie,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
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
];

export const timePrice = {
    0: 'Thứ 2 đến thứ 5 trước 17h',
    1: 'Thứ 2 đến thứ 5 sau 17h',
    2: 'Thứ 6 đến chủ nhật trước 17h',
    3: 'Thứ 6 đến chủ nhật sau 17h'
}

export const typeUserPrice = {
    0: 'Học sinh, sinh viên',
    1: 'Người lớn',
    2: 'Người già, trẻ em',
    3: 'Thành viên, vé trực tuyến',
};

export const typeShowTime = {
    0: 'Theo lịch',
    1: 'Chiếu sớm'
}

export const statusShowTime = {
    0: 'Đã chiếu',
    1: 'Đang chiếu',
    2: 'Sắp chiếu'
}

export const allTranslate = ['Phụ đề', 'Lồng tiếng', 'Thuyết minh'];
