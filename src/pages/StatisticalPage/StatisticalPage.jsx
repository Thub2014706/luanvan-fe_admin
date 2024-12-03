import React from 'react';
import BasicStatistics from '~/components/BasicStatistics/BasicStatistics';
import FooterStatistical from '~/components/FooterStatistical/FooterStatistical';
import MainStatistical from '~/components/MainStatistical/MainStatistical';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const StatisticalPage = () => {
    // const defaultProps = {
    //     center: {
    //         lat: 10.99835602,
    //         lng: 77.01502627,
    //     },
    //     zoom: 11,
    // };

    return (
        <div>
            <BasicStatistics />
            <MainStatistical />
            <FooterStatistical />
            {/* <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
                </GoogleMapReact>
            </div> */}
        </div>
    );
};

export default StatisticalPage;
