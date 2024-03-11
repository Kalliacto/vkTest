import data from '../data/groups.json';

export async function getGroupsResponse(closed, avatarColor, friend) {

  const response = await new Promise((resolve, reject) => {
  
    if (Math.random() < 0.03) {
      reject({result: 0, err: 'Данные не пришли'})
    } else {
      setTimeout(() => {
        resolve({result: 1, data: data.filter((group) => {

          if (closed !== 'allCloseOpen') {
              if (group.closed !== (closed === 'true')) {
                  return false;
              }
          }
      
          if (friend !== 'allFriends') {
              if (friend !== 'withFriends' && group.friends) {
                  return false;
              }
              if (friend === 'withFriends' && !group.friends) {
                  return false;
              }
          }
      
          if (avatarColor !== 'allColors' && avatarColor !== 'Нет аватарки') {
            if (group.avatar_color !== avatarColor) {
              return false;
            }
          } else {
            if (group.avatar_color && avatarColor === 'Нет аватарки') {
              return false;
            }
          }
      
          return true;
        })});
      }, 1000);
    }
  });

  return response;

}
