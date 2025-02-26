import { useEffect, useState, useCallback } from 'react';
import './Lesson.css';
import axios from 'axios';
import { apiUrl } from '../../apiUrl';
import { useNavigate } from 'react-router-dom';

export default function Lesson() {
    const [searchBarText, setSearchBarText] = useState('');
    const [lessons, setLessons] = useState([]); // Filtered lessons
    const [allLessons, setAllLessons] = useState([]); // This stores all lessons for filtering
    const [isLoading, setIsLoading] = useState(true);
    const getLessons = useCallback(async () => {
        setIsLoading(true);
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            };
            const res = await axios.get(`${apiUrl}/api/lessons`, config);
            setAllLessons(res.data.lessons);
            setLessons(res.data.lessons);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        }finally{
            setIsLoading(false);
        }
    }, []);

    // Fetch lessons when the component mounts
    useEffect(() => {
        getLessons();
    }, [getLessons]);

    // Debouncing
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!searchBarText) {
                setLessons(allLessons);
            } else {
                const filteredLessons = allLessons.filter((lesson) =>
                    lesson.name.toLowerCase().includes(searchBarText.toLowerCase())
                );
                setLessons(filteredLessons);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchBarText, allLessons]);

    return (
        <div className='lesson-container'>
            <div className='lesson-heading'>LESSONS</div>
            <div className='search-bar-container'>
                <label className='search-bar-label'>Search: </label>
                <input
                    type='text'
                    onChange={(e) => setSearchBarText(e.target.value)}
                    value={searchBarText}
                    className='search-bar'
                    placeholder='Song Name'
                />
            </div>
            <div className='filtered-lessons-container'>
                {isLoading ? <div>Loading...</div> : (lessons.length > 0 ? (
                    lessons.map((lesson, key) => (
                        <LessonCard
                            key={key}
                            name={lesson.name}
                            instrument={lesson.instrument}
                            public_id = {lesson.public_id}
                        />
                    ))
                ) : (
                    <p>No lessons found.</p>
                ))}
            </div>
        </div>
    );
}

function LessonCard({ name, instrument, public_id }) {
    const navigate = useNavigate();
    function redirectToViewLesson(url){
        navigate(`/lessons/${url}`);
    }

    return (
        <div className='lesson-card-container'>
            <div className='lesson-card-left'>
                <h3>{name}</h3>
                <p>{instrument}</p>
            </div>
            <div className='lesson-card-right'>
                <button className='lesson-card-btn' onClick={() => redirectToViewLesson(public_id)}>View</button>
            </div>
        </div>
    );
}
