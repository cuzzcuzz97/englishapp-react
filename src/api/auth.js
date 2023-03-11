import axios from 'axios'
axios.defaults.withCredentials = true
const url = 'https://api-englishapp-production.up.railway.app/'
// const url = 'http://localhost:5000/'


export async function onRegistration(registrationData) {
    return await axios.post(`${url}register`,
    registrationData)
}

export async function onLogin(loginData) {
    return await axios.post(`${url}login`, loginData)
}

export async function onLogout() {
    return await axios.get(`${url}logout`)
}

export async function fetchProtectedInfo() {
    return await axios.get(`${url}protected`)
}

// export async function fetchUserInfo() {
//     return await axios.get(`${url}get-user`, {
//       withCredentials: true,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
export async function fetchUserInfo() {
    try {
      const response = await axios.get(`${url}get-user`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('fetchUserInfo error', error);
      throw error;
    }
  }


export async function fetchLists(user_id) {
    return await axios.get(`${url}app/${user_id}`)
}

export async function fetchVocabs(id) {
    return await axios.get(`${url}app/vocab/${id}`)
}

export async function addNewListVocab(listData) {
    return await axios.post(`${url}app`, listData)
}

export async function addNewVocab(vocabData) {
    return await axios.post(`${url}app/addvocab`, vocabData)
}

export async function deleteListVocab(listId) {
    return await axios.delete(`${url}app/delete/${listId}`)
}

export async function deleteVocab(vocabId) {
    return await axios.delete(`${url}app/vocab/delete/${vocabId}`)
}