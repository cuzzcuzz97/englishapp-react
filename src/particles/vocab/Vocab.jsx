import React from 'react';
import './vocab.css';
import { deleteVocab } from '../../api/auth';
import speechHandler from '../speech/speech';

const Vocab = ({words,setWords,getVocab,selectedList}) => {
  const msg = new SpeechSynthesisUtterance()

  const handleClickSpeak = async (word, msg) => {
    await speechHandler(word,msg);
  };


  const handleDeleteVocab = async (word) => {
    try {
      await deleteVocab(word.id);
    } catch {
      const updatedWords = words.filter((w) => w.name !== word.name);
      setWords(updatedWords)
    }
    getVocab(selectedList.id)
  }

  return (
    <div className='app__main-container__folder-addlist__listvocab'>
      {words.map((word, index) => (
        <div key={word.id} className='listvocab-item' 
        >
            <>
            <div className='listvocab-item__container'>
              <span className='listvocab-item__vocab'
              onClick={() => {
                handleClickSpeak(word.name, msg)
              }}
              >
                {index+1}.{word.name}
              </span>
              {/* <span className='listvocab-item__meaning'>{word.meaning.split(' ').slice(0,5).join(' ')}</span> */}
              <span className='listvocab-item__meaning'>{word.meaning}</span>
              </div>
            </>
            <div className='vocab-icon'>
                <svg onClick={() => {
                  handleDeleteVocab(word)
                }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Vocab;
