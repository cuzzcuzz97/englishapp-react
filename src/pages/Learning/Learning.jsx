import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import './learning.css';
import { useParams } from 'react-router-dom';
import { RxSpeakerLoud } from 'react-icons/rx'
import { fetchVocabs } from '../../api/auth';
import speechHandler from '../../particles/speech/speech';

const Learning = () => {
    const [scrollLeft, setScrollLeft] = useState(0);
    const scrollRef = useRef(0);
    const [cards,setCards] = useState([]);
    const [sufferMessage,setSufferMessage] = useState('');
    const { id } = useParams();
    const [vocabCards,setVocabCards] = useState([]);
    const msg = new SpeechSynthesisUtterance()

    const handleClickSpeak = async (word, msg) => {
      await speechHandler(word,msg);
    };

    const handleScroll = (scrollOffset) => {
      scrollRef.current.scrollLeft += scrollOffset;
      setScrollLeft(scrollRef.current.scrollLeft);
    };

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    function shuffleDeck(cards) {
        let currentIndex = cards.length - 1;
      
        while (currentIndex >= 0) {
          const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
          [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
          currentIndex--;
        }
      
        return cards;
      }

      
    useEffect(() => {
        const getVocab = async (id) => {
            try {
            const response = await fetchVocabs(id
            ,  {
                method: 'GET',
                credentials: 'include' // include cookies in the request
              });
              const jsonData = await response.data;
              const updatedCards = jsonData.map((card) => {
                return {
                    ...card,
                }
            })
              await setCards(updatedCards);
            } catch (err) {
              console.error(err)
            }
          }
        getVocab(id);
        
      },[id])

    useEffect(() => {
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
        cards.forEach((card) => {
            fetch(`${url}${card.name}`)
            .then((response) => response.json())
            .then((data) =>{
                const combinedData = { ...data[0], ...card}
                setVocabCards((card) => [
                    ...card,
                    combinedData
                ]
                )
            })
        });
    },[cards])

  return (
      <Layout>
        <div className='container d-flex flex-column align-items-center justify-content-center'>
            <div className='title m-5'>Learning Here</div>
            <div className='d-flex flex-row align-items-center justify-content-center'
            style={{width: '100%', border:'1px solid #cccccc',
            borderRadius: '5px',
            boxShadow: '0 0 5px #a5a5ff',
            overflow: 'hidden'
        }}
            >
            <div className=" card-group d-flex flex-row flex-nowrap overflow-scroll"
             
             ref={scrollRef}
             > {vocabCards.map((card,index) => (
                <>
                <div className='card text-center' style={{flex: "0 0 100%", width: '500px', height: "300px",padding: "10px" }} key={index+=1}>
                    <p>{index+1}/{cards.length}</p>
                    <div className={`card-body flip-card ${isFlipped ? 'flipped':'' }`} onClick={() => {
                        handleFlip()
                    }}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front d-flex align-items-center justify-content-center">
                                <h2 className='no-select'>{card.name}</h2>
                            </div>
                            <div className="flip-card-back d-flex flex-column align-items-center justify-content-center">
                                <h2 className='no-select'>{card.meaning}</h2>
                                <p className='no-select'>{card.phonetic}</p>
                                {/* <p className='no-select'>{card.meanings[0].definitions[0].example || "" }</p> */}
                            </div>
                        </div>
                    </div>
                    <p style={{marginTop: '20px'}} onClick={() => {
                        handleClickSpeak(card.name, msg)
                }
                    }><RxSpeakerLoud size={40}/></p>
                </div>
                </>
             ))}


            </div>
          </div>
          <button
            className="btn btn-primary mt-4 no-select"
            disabled={scrollLeft === 0}
            onClick={() => {
                handleScroll(-scrollRef.current.offsetWidth)
                setIsFlipped(false)
                setSufferMessage('')
            }}
          >
            {"Previous"}
          </button>
          <button
            className="btn btn-primary mt-4 pe-4 ps-4 no-select"
            
            disabled={scrollLeft === scrollRef.current.scrollWidth - scrollRef.current.offsetWidth}
            onClick={() => {
                setIsFlipped(false)
                handleScroll(scrollRef.current.offsetWidth)
                setSufferMessage('')
            }
            }
          >
            {"Next"}
          </button>
          <p className='text-success m-4'>{sufferMessage}</p>
          <button
          className='btn btn-danger pe-4 ps-4 no-slect'
          onClick={() => {
            shuffleDeck(cards)
            setSufferMessage('Suffered')
          }}
          >
              {"Suffer Cards"}
          </button>
        </div>
    </Layout>
  )
}

export default Learning