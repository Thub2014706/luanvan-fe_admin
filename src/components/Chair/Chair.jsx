import React from 'react';
import { Table } from 'react-bootstrap';

const Chair = () => {
    const colChair = [];
    const rowChair = [];

    for (let i = 1; i < 10; i++) {
        colChair.push(i);
    }

    for (let i = 1; i < 10; i++) {
        rowChair.push(i);
    }

    return (
        <div>
            <Table borderless className="w-auto">
                <tbody>
                    {colChair.map((itemCol) => (
                        <tr>
                            <td>{String.fromCharCode(64 + itemCol)}</td>
                            {rowChair.map((itemRow) => (
                                <td>
                                    <div className="number-chair">
                                        <p className="text-center">{String.fromCharCode(64 + itemCol) + itemRow}</p>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Chair;
