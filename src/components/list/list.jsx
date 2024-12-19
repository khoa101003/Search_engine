import React from 'react';
import { styled } from '@mui/material/styles';

const ListContainer = styled('div')({
    maxHeight: '350px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
});

const List = ({ data, andSearch, size }) => {
    console.log("render list")
    //console.log(data)
    if (andSearch)
        return (
            /*data = data.sort((a, b) => {
                if (a.trans_no === b.trans_no) {
                    return a.pattern - b.pattern;
                }
                return a.trans_no - b.trans_no;
            })
                .filter((item, index, self) =>
                    index === self.findIndex(t => (
                        t.trans_no === item.trans_no && t.pattern === item.pattern
                    ))
                )
                .filter((item, index, self) =>
                    self.filter(t => t.trans_no === item.trans_no).length === size ? index === 0 : true
                )*/
            <div></div>
        )
    if (data.length <= 0)
        return (
            <div>
                <h2>No results</h2>
            </div>
        )
    else
        return (
            <div>
                <h2>Transaction List {"(" + data.length + " results)"}</h2>
                <ListContainer>
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Credit</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(0, 2000).map((item, index) => (
                                <tr key={index}>
                                    <td>{item.time}</td>
                                    <td>{item.credit}</td>
                                    <td>{item.detail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ListContainer>
            </div>
        );
};

export default List;