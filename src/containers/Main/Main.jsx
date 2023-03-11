import { React, useState , useEffect } from 'react';
import './main.css';
import { AddList, VocabList } from '../../components';
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, fetchUserInfo, onLogout, fetchLists } from '../../api/auth'
import {unauthenticateUser } from '../../redux/slices/authSlice'
import Layout from '../../components/Layout/Layout';



const Main = () => {
    const [isAddList, setToggled] = useState(true);
    const [listVocab, setLists] = useState([]);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [protectedData, setProtectedData] = useState(null)

    const logout = async () => {
      try {
        await onLogout()
  
        dispatch(unauthenticateUser())
        localStorage.removeItem('isAuth')
      } catch (error) {
        console.log(error.response)
      }
    }
  
    const protectedInfo = async () => {
      try {
        const { data } = await fetchProtectedInfo()
        setProtectedData(data.info)
        if (protectedData) {
        }
        setLoading(false)
      } catch (error) {
        logout()
      }
    }

    const getListVocab = async () => {
      try {
        const data = await fetchUserInfo()
        const user_id = data.user.user_id
        const response = await fetchLists(user_id);
        const jsonData = await response.data;
        setLists(jsonData)
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
      protectedInfo()
    })
    useEffect(() => {
      getListVocab();
    }, []);



    function handleAddFolderClick() {
      if (localStorage.getItem('vocabulary').length > 2) {
        const willDelete = window.confirm('You have not saved the list are you sure to go back?');
        if (willDelete) {
          localStorage.setItem('vocabulary', JSON.stringify(0));
          setToggled(!isAddList);
        } else {

        }
      } else {
        setToggled(!isAddList);
      }
    }
  return loading ? (<><Layout><h1>Loading...</h1></Layout></>) : (
    <Layout >
      <div className='app__main'>
          <div className='app__main-container'>
              <div className='app__main-container__folder'>
                  <div className='app__main-container__folder-title'>
                      <h1 className='app__main-container__folder-title'>{isAddList ? "Vocabulary list" : "Add Vocab"}</h1>
                  </div>
                  <div className='app__main-container__folder-addbtn'>
                      <span className='AddFolder-btn' onClick={handleAddFolderClick}>
                          {isAddList ? "Add new list" : "Return"}
                          </span>
                  </div>
                  {isAddList ? (<VocabList lists={listVocab} getListVocab={getListVocab} />) : (<AddList lists={listVocab} setLists={setLists} isAddList={isAddList} setIsAddList={setToggled} getListVocab={getListVocab}  />)}
              </div>
          </div>
      </div>
    </Layout>
  )
}

export default Main
