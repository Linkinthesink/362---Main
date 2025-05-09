import { Link } from 'react-router-dom';
import ExerciseCollection from '../components/GroupCollection';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom'

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();
    
    const loadExercise = async() => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);

    }

    useEffect( () =>{
        loadExercise();
    }, []);


    const onDelete = async(_id, name) =>{
        if(window.confirm("Are you sure you want to delete?")){     //confimation popup to prevent accidental misclicks 
            const response = await fetch(
                `/exercises/${_id}`, 
                {method: 'DELETE'}
            );
            if(response.status === 204){
                setExercises(exercises.filter(e => e._id !== _id))
                alert(`Deleted exercise ${name}, id: ${_id}`)
            } else{
                alert(`failed to delete exercise ${name}, id: ${_id} `)
            }
        }
    }

    const onEdit = (exercise) =>{
        setExerciseToEdit(exercise);
        navigate('/edit-exercise');
    }


    return (
        <table className="page">
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                <ExerciseCollection exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseCollection>
            </tbody>
        </table> 
    );
}

export default HomePage;