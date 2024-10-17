import React from 'react';
import BasicStatistics from '~/components/BasicStatistics/BasicStatistics';
import FooterStatistical from '~/components/FooterStatistical/FooterStatistical';
import MainStatistical from '~/components/MainStatistical/MainStatistical';
import ChatBot from '../../components/ChatBot/ChatBot';

const StatisticalPage = () => {
    return (
        <div>
            <BasicStatistics />
            <MainStatistical />
            <FooterStatistical />
            <ChatBot />
        </div>
    );
};

export default StatisticalPage;
