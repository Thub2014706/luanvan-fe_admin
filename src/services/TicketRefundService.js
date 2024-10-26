import axios from 'axios';
import FileSaver from 'file-saver';
import { showToast } from '~/constants';

export const allOrderTicketRefund = async (theater, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/ticket-refund/all-refund?theater=${theater}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const exportTicketRefund = async (theater) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ticket-refund/export?theater=${theater}`, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver.saveAs(blob, 'danh_sach_ve_da_hoan_tra.xlsx');
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};