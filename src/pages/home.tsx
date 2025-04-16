import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';

const items = [0, 1, 2, 3];

const ANIM_TIME = 0.5; // time for base animations to complete
const ANIM_STEP_TIME = 0.1; // added delay between each sequential loading dot
const LOAD_ANIM_TIME = ANIM_TIME + 3 * ANIM_STEP_TIME; // total animation time for loading dots
const ANIM_SPACING_TIME = 0.1; // spacing time added between animations;
const MS = 1000; // s to ms conversion factor

export default function Home() {
  const [reRoll, setReRoll] = useState(false);
  const [rollVisible, setRollVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [resultName, setResultName] = useState("None");

  useEffect(() => {
    if (reRoll) {
      let extra_delay = 1
      if (!resultVisible) {
        extra_delay = 0;
      }
      setResultVisible(false);

      setTimeout(async () => { // pick random recipe from db
        const recipe = await window.database.getRandRecipe();
        let name = "No Recipes";
        console.log(recipe);
        if (recipe) {
          name = recipe.name;
        }
        setResultName(name);
      }, ANIM_TIME * MS * extra_delay);

      setTimeout(() => { // initiate loading entrance animation after prev result is gone
        setRollVisible(true);
      }, ((ANIM_TIME + ANIM_SPACING_TIME) * MS) * extra_delay);

      setTimeout(() => { // initiate loading exit animation after entrance animation is done
        setRollVisible(false);
      }, LOAD_ANIM_TIME * MS + ((ANIM_TIME + ANIM_SPACING_TIME) * MS) * extra_delay);

      setTimeout(() => { // initiate new result animation once loading is done
        setReRoll(false);
        setResultVisible(true);
      }, (LOAD_ANIM_TIME * 2 + ANIM_SPACING_TIME) * MS + ((ANIM_TIME + ANIM_SPACING_TIME) * MS) * extra_delay);
    }
  }, [reRoll]);

  return (
    <div style={{ marginTop: "30px" }}>
      <motion.button
        className='primaryBtn'
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
                transition={{ duration: ANIM_TIME, delay: index * ANIM_STEP_TIME }}
              />
            : null
          ))}
          {resultVisible ? <motion.p
            className='rollResult'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: ANIM_TIME }}
          >
            {resultName}
          </motion.p> : null}
        </AnimatePresence>
      </ul>
    </div>
  );
}
