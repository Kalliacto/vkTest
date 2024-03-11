import React, { useEffect, useState } from 'react';
import GroupItem from '../components/GroupItem/GroupItem';
import { getGroupsResponse } from '../api/api';

const GroupListPage = (props) => {
    const [groupsData, setGroupsData] = useState([]);
    const [filteredGroup, setFilteredGroup] = useState([]);
    const [colors, setColors] = useState([]);
    const [closedGroup, setClosedGroup] = useState('allCloseOpen');
    const [filteredColors, setFilteredColors] = useState('allColors');
    const [includesFriends, setIncludesFriends] = useState('allFriends');

    useEffect(() => {
        getGroupsResponse(closedGroup, filteredColors, includesFriends)
            .then((res) => {
                if (groupsData.length === 0) {
                    setGroupsData(res.data);
                }
                setFilteredGroup(res.data);
            })
            .catch((err) => {
                alert('Ошибка при выполнении запроса. Попробуйте ещё раз');
                console.error(err);
            });
    }, [groupsData.length, closedGroup, filteredColors, includesFriends]);

    useEffect(() => {
        if (groupsData.length === 0) return;

        const colors = new Set(groupsData.map((group) => group.avatar_color ?? 'Нет аватарки'));
        setColors(Array.from(colors));
    }, [groupsData]);

    function handleSelect(e) {
        switch (e.target.name) {
            case 'closedGroup':
                setClosedGroup(e.target.value);
                break;
            case 'filteredColors':
                setFilteredColors(e.target.value);
                break;
            case 'includesFriends':
                setIncludesFriends(e.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className='filter'>
                <label>
                    По цвету <br />
                    <select name='filteredColors' onChange={handleSelect}>
                        <option value='allColors'>Все группы</option>
                        {!!colors.length &&
                            colors.map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                    </select>
                </label>
                <label>
                    По приватности <br />
                    <select name='closedGroup' onChange={handleSelect}>
                        <option value='allCloseOpen'>Все группы</option>
                        <option value='true'>Закрытая группа</option>
                        <option value='false'>Открытая группа</option>
                    </select>
                </label>
                <label>
                    По друзьям
                    <br />
                    <select name='includesFriends' onChange={handleSelect}>
                        <option value='allFriends'>Все группы</option>
                        <option value='withFriends'>Друзья в группе</option>
                        <option value='withoutFriends'>Нет друзей в группе</option>
                    </select>
                </label>
            </div>
            <div className='card__list'>
                {filteredGroup.length === 0 && 'Группы не найдены'}
                {filteredGroup.map((el) => (
                    <GroupItem item={el} key={el.id} />
                ))}
            </div>
        </>
    );
};

export default GroupListPage;
