import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import * as http from '../services/http';

export default function RenameAndDelete({ item, type }) {
  // Bindings
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const renameRef = useRef(null);
  const navigate = useNavigate();

  // State
  const [renameVisible, setRenameVisible] = useState(false);
  const [itemName, setItemName] = useState(item.name);
  const [confirmVisible, setConfirmVisible] = useState(false);

  useEffect(() => {
    if (renameVisible) {
      renameRef.current.focus();
    }
  }, [renameVisible]);

  // Hide/show the rename form
  const handleHideShowRename = () => {
    setRenameVisible(true);
  };

  // Update name state on change
  const onChange = e => {
    setItemName(e.target.value);
  };

  // Save new name on blur
  const handleBlur = async e => {
    const updatedItem = {
      name: itemName,
    };

    try {
      if (type === 'exercise') {
        await http.renameExercise(id, auth.token, updatedItem);
      } else {
        await http.renameRoutine(id, auth.token, updatedItem);
      }
    } catch (err) {
      console.log(err.message);
    }

    setRenameVisible(false);
  };

  // Rename form submit function
  const handleSubmit = async e => {
    e.preventDefault();

    const updatedItem = {
      name: itemName,
    };

    try {
      let res;

      if (type === 'exercise') {
        res = await http.renameExercise(id, auth.token, updatedItem);
      } else {
        res = await http.renameRoutine(id, auth.token, updatedItem);
      }

      if (res.success) {
        renameRef.current.blur();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // Confirm delete function
  const handleConfirmDelete = () => {
    setConfirmVisible(true);
  };

  // Delete exercise function
  const handleDelete = async () => {
    try {
      if (type === 'exercise') {
        await http.deleteExercise(id, auth.token);
        navigate('/exercises');
      } else {
        await http.deleteRoutine(id, auth.token);
        navigate('/routines');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="mb-4">
      <form
        onSubmit={handleSubmit}
        className={`flex gap-4 ${renameVisible ? '' : 'hidden'}`}
      >
        <input
          ref={renameRef}
          type="text"
          name="name"
          id="name"
          placeholder={itemName}
          value={itemName}
          onChange={e => onChange(e)}
          onBlur={e => handleBlur(e)}
        />
      </form>
      <div
        className={`flex justify-between items-center ${
          renameVisible ? 'hidden' : ''
        }`}
      >
        <div>
          <h1 className="flex items-center gap-4">
            {itemName}{' '}
            <div onClick={handleHideShowRename} className="edit-button blue">
              Rename
            </div>
          </h1>
        </div>
        <div
          onClick={handleConfirmDelete}
          className={`${confirmVisible ? 'hidden' : ''} edit-button red`}
        >
          Delete
        </div>
        <div className={`${confirmVisible ? '' : 'hidden'} flex gap-2`}>
          <div onClick={handleDelete} className={`edit-button red`}>
            Delete!
          </div>
          <div
            onClick={() => setConfirmVisible(false)}
            className={`edit-button dark`}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
