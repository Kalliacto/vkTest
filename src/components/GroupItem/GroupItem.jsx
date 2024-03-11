import React from 'react';
import CardFriends from '../CardFriends/CardFriends';

const GroupItem = ({ item }) => {
    return (
        <div className='card'>
            {!!item.avatar_color ? (
                <p className='card__avatar' style={{ backgroundColor: item.avatar_color }} />
            ) : (
                <p className='card__avatar'>Меня временно нет</p>
            )}
            <div className='card__info'>
                <h3 className='card__title'>{item.name}</h3>
                <p className='card__private'>Приватность: {item.closed ? 'Закрытая группа' : 'Открытая группа'}</p>
                <p className='card__members'>{!!item.members_count && 'Подписчики: ' + item.members_count}</p>
                <div className='card__friends'>{!!item.friends && <CardFriends friends={item.friends} />}</div>
            </div>
        </div>
    );
};

export default GroupItem;
