import Groups from './Groups';

function GroupsList({exercises, onDelete, onEdit}) {
    return (
        <>
            {exercises.map((exercise, i) => <Groups exercise={exercise} 
                  onDelete={onDelete} onEdit={onEdit} key={i} />)}
        </>

    );
}

export default GroupsList;