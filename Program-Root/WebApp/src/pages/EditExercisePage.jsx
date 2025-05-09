import { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`, {
                method: 'PUT',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(editedExercise)
                }
        );
        if(response.status === 200){
            alert("Sucsessfully edited exercixe");
        } else{
            alert(`Failed to edit exercise`)
        }
        navigate('/');
    
    };

    return (
        <div className="page">
            <h1>Edit Exercise</h1>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} /> <br/> 
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.valueAsNumber)} /> <br/> 
            <input
                type="number"
                size="11"
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <select 
                name="unit"
                value={unit}
                onChange={e => setUnit(e.target.value)} >
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select> <br/> 
            <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} /> <br/> 
            <button
                onClick={editExercise}
            >Update</button>
        </div>
    );
}

export default EditExercisePage;