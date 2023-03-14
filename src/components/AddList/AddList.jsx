import React, {useState} from 'react';
import { Vocab } from '../../particles';
import './addlist.css';
import { addNewListVocab, addNewVocab } from '../../api/auth';
import { fetchUserInfo } from '../../api/auth'
import FormAddWord from '../FormAddWord/FormAddWord';

const vocabulary = {
    "words": [
    ]
  };

const AddList = ({lists,setLists, isAddList,setIsAddList,getListVocab}) => {
    const [newListName, setNewListName] = useState("");
    const [words,setWords] = useState(vocabulary.words);


    const handleAddList = async (event) => {
        event.preventDefault();
        if (newListName.trim() === '' || words.length === 0) {
          return;
        }
        try {
            const dataUser = await fetchUserInfo()
            console.log(dataUser.user)
            const user_id = dataUser.user.user_id
            const listName = {title: newListName, user_id: user_id}
            const { data } = await addNewListVocab(listName)
    
            const newVocab = words.map(({ name, meaning }) => {
                return {
                    name: name,
                    meaning: meaning,
                    list_id: data.rows[0].id 
                };
                
            });
            await Promise.all(
                newVocab.map((vocab) => {
                    return addNewVocab(vocab);
                })
            );

            setNewListName('');
            localStorage.setItem('vocabulary', JSON.stringify(0));
            setIsAddList(!isAddList)
            getListVocab()
            // setLists([...lists, newList]);
            vocabulary.words = [];
        } catch (err) {
            console.log(err)
        }
        
      }
    
  return (
    <div className='app__main-container__folder-addlist'>
        <div className='app__main-container__folder-nameoflist'>
            <input type="text" 
            value={newListName}
            onChange={(event) => setNewListName(event.target.value)}
            placeholder='Enter name of list' />
        </div>
        <Vocab words={words} setWords={setWords} />
        <FormAddWord words={words} vocabulary={vocabulary} setWords={setWords} />
        <form className='form_addlist' onSubmit={handleAddList}>
            <div className='form_addlist-btn'>
                <button className='btn btn-primary' type="submit">Save List</button>
            </div>
        </form>
    </div>
  )
}

export default AddList