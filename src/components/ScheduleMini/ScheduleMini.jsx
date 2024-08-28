import React from 'react';
import { Card } from 'react-bootstrap';

const ScheduleMini = ({ day, date, selectDay, handleSelectDay }) => {
    return (
        <div className="me-4">
            <Card onClick={handleSelectDay} className={`card-date ${selectDay ? 'yes' : 'no'}`}>
                <Card.Header className={`text-center fw-bold card-head-date ${selectDay ? 'yes' : 'no'}`}>
                    {date}
                </Card.Header>
                <p className={`text-center mt-1 card-body-date ${selectDay ? 'yes' : ''}`}>{day}</p>
            </Card>
        </div>
    );
};

export default ScheduleMini;
