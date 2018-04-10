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
        <div className={styles.LaneAddNote}>
          <button onClick={() => addNote({ task: 'New Note' }, laneId)}>Add Note</button>
        </div>
      </div>
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
      <div className={styles.LaneDelete}>
        <button onClick={() => deleteLane(laneId)}>Remove Lane</button>
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
