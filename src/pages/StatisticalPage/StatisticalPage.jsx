import React from 'react';
import BasicStatistics from '~/components/BasicStatistics/BasicStatistics';
import FooterStatistical from '~/components/FooterStatistical/FooterStatistical';
import MainStatistical from '~/components/MainStatistical/MainStatistical';

const StatisticalPage = () => {
    return (
        <div>
            <BasicStatistics />
            <MainStatistical />
            <FooterStatistical />
        </div>
    );
};

export default StatisticalPage;
