import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';

const items = [0, 1, 2, 3];

export default function Home() {
  const [reRoll, setReRoll] = useState(false);
  const [rollVisible, setRollVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  useEffect(() => {
    if (reRoll) {
      let extra_delay = 1
      if (!resultVisible) {
        extra_delay = 0;
      }
      setResultVisible(false);
      setTimeout(() => {
        setRollVisible(true);
      }, 600 * extra_delay);
      setTimeout(() => {
        setRollVisible(false);
      }, 800 + 600 * extra_delay);
      setTimeout(() => {
        setReRoll(false);
        setResultVisible(true);
      }, 1700 + 600 * extra_delay);
    }
  }, [reRoll]);

  return (
    <div style={{ marginTop: "30px" }}>
      <motion.button
        className='rollBtn'
        onClick={() => reRoll ? null : setReRoll(true)}
        whileTap={{ y: 1 }}
      >
        {!reRoll && !resultVisible ? "Roll" : "Re-Roll"}
      </motion.button>
      <ul className = 'rollDisplay'>
        <AnimatePresence>
          {items.map((index) => (
            rollVisible ?
              <motion.li
                key={index}
                className='list-item'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            : null
          ))}
          {resultVisible ? <motion.p
            className='rollResult'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            Tuscan Shrimp Marinara
          </motion.p> : null}
        </AnimatePresence>
      </ul>
    </div>
  );
}
