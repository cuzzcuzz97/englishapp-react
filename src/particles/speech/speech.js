const speechHandler = async (word,msg) => {
    msg.text = word;
    msg.lang = 'en-US';
    await new Promise((resolve) => {
      window.speechSynthesis.speak(msg);
      msg.onend = resolve;
    });
  };

  export default speechHandler;
  