import React, { useState } from 'react';

const CardFriends = ({ friends }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className='friends'>
            <p className='friends__count' onClick={() => setVisible((s) => !s)}>
                {'Друзья: ' + friends.length}
            </p>
            {visible ? (
                <ul className='friends__list'>
                    {friends.map((el, i) => {
                        return (
                            <li className='friends__item' key={i}>
                                <span>{el.first_name}&nbsp;</span>
                                <span>{el.last_name}</span>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                ''
            )}
        </div>
    );
};

export default CardFriends;
