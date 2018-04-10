import React, { PropTypes } from 'react';
import NotesContainer from '../Note/NotesContainer';
import Edit from '../../components/Edit';
import { fetchLanes } from './LaneActions';

import styles from './Lane.css';

const Lane = (props) => {
  const { connectDropTarget, lane, laneNotes, editLane, addNote, updateLane, deleteLane } = props;
  const laneId = lane.id;

  return connectDropTarget(
    <div className={styles.Lane}>
      <div className={styles.LaneHeader}>
        <Edit
          className={styles.LaneName}
          editing={lane.editing}
          value={lane.name}
          onValueClick={() => editLane(lane.id)}
          onUpdate={name => updateLane({ ...lane, name, editing: false })}
        />
        <button className={styles.AddNote} onClick={() => addNote({ task: 'New note' }, laneId)}>+</button>
      </div>
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
      <div>
        <button className={styles.LaneDelete} onClick={() => deleteLane(laneId)}>REMOVE LANE</button>
      </div>
    </div>
  );
};

Lane.need = [() => { return fetchLanes(); }];

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  editLane: PropTypes.func,
};

export default Lane;
