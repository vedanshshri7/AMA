import axios from "axios";
import { useEffect, useState, useCallback } from "react"
import { apiUrl } from "../../../apiUrl";
import { useNavigate } from "react-router-dom";
import './Lessons.css';
function Lessons() {
    const [searchBarText, setSearchBarText] = useState('');
    const [lessons, setLessons] = useState([]); // Filtered lessons
    const [allLessons, setAllLessons] = useState([]); // This stores all lessons for filtering
    const [isLoading, setIsLoading] = useState(true);
    const [lessonName, setLessonName] = useState("");
    const [instrument, setInstrument] = useState("Guitar");
    const [tag, setTag] = useState("Tab");
    const [file, setFile] = useState(null);
    const getLessons = useCallback(async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            };
            const res = await axios.get(`${apiUrl}/api/admin/lessons`, config);
            setAllLessons(res.data.lessons);
            setLessons(res.data.lessons);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        }
    }, []);

    // Fetch lessons when the component mounts
    useEffect(() => {
        setIsLoading(true);
        getLessons();
        setIsLoading(false);
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

    async function handleUpload(){
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.token}`,
            },
        };
        console.log(file)
        let formData = new FormData();
        formData.append('name', lessonName);
        formData.append('instrument', instrument);
        formData.append('tag', tag);
        formData.append('file', file);
        axios.post(`${apiUrl}/api/admin/new-lesson`, formData, config)
            .then(()=>{
                setLessonName("");
                setInstrument('Guitar');
                setTag('Tab');
                setFile(null);
                getLessons();
            }) 
    } 
    return (
        <div className="admin-lesson-container">
            <div className="new-lesson">
                <div className="lesson-upload-heading">Upload a new Lesson</div>
                <InputComponent placeholder="Channa Mere ya" type="text" label="Name" value={lessonName} onChange={(e) => setLessonName(e.target.value)} />
                <div className="upload-lesson-input-container">
                    <label htmlFor="lesson-instrument" className="upload-lesson-label">Instrument</label>
                    <select id="lesson-instrument" value={instrument} onChange={(e) => setInstrument(e.target.value)} className="upload-lesson-input">
                        <option value="Guitar">Guitar</option>
                        <option value="Piano">Piano</option>
                    </select>
                </div>
                <div className="upload-lesson-input-container">
                    <label htmlFor="lesson-tag">Type</label>
                    <select id="lesson-tag" value={tag} onChange={(e) => setTag(e.target.value)} className="upload-lesson-input">
                        <option value="Tab">Tab</option>
                        <option value="Chord">Chord</option>
                    </select>
                </div>
                <div className="upload-lesson-input-container">
                    <label>Lesson to upload: </label>
                    <input type="file" accept=".pdf" onChange={(e) => {
                        console.log(e.target.files)
                        setFile(e.target.files[0])}}
                        className="upload-lesson-input"
                    />
                </div>
                <div style={{'textAlign': 'center'}}>
                    <button onClick={handleUpload} className="upload-lesson-btn">Upload</button>
                </div>
            </div>
            <div className="admin-lesson-heading">List of all Lessons</div>
            <div className='admin-search-bar-container'>
                <label className='admin-search-bar-label'>Search: </label>
                <input
                    type='text'
                    onChange={(e) => setSearchBarText(e.target.value)}
                    value={searchBarText}
                    className='admin-search-bar'
                    placeholder='Song Name'
                />
            </div>
            <div className='admin-filtered-lessons-container'>
                {
                    isLoading ?  <div>Loading...</div>:
                    (lessons.length > 0 ? (
                        lessons.map((lesson, key) => (
                            <LessonCard
                                key={key}
                                name={lesson.name}
                                instrument={lesson.instrument}
                                public_id = {lesson.public_id}
                                isVisible = {lesson.isVisible}
                                getLessons = {getLessons}
                            />
                        ))
                    ) : (
                        <div>No lessons found.</div>
                    ))
                }
            </div>
        </div>
    )
}
function LessonCard({ name, instrument, public_id, isVisible, getLessons }) {
    const navigate = useNavigate();
    function redirectToViewLesson(url){
        navigate(`/admin/lessons/${url}`);
    }
    async function deleteLesson(public_id){
        let confirmDecision = window.confirm('Are you sure you want to delete this lesson?');
        if(confirmDecision){
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            };
            await axios.delete(`${apiUrl}/api/admin/lesson/${public_id}`, config);
            getLessons();
        }
    }
    async function toggleVisibility(public_id){
        let confirmDecision = window.confirm('Do you want to change visibility?');
        if(confirmDecision){
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            };
            const currentVisibility = isVisible;
            await axios.put(`${apiUrl}/api/admin/lesson/${public_id}`, {
                isVisible: !currentVisibility
            }, config);
            getLessons();
        }
    }
    return (
        <div className='admin-lesson-card-container'>
            <div className='admin-lesson-card-left'>
                <h3>{name}</h3>
                <p>{instrument}</p>
                <div>{isVisible ? <div className="admin-card-visible">Visible</div>: <div className="admin-card-not-visible">Not Visible</div>}</div>
            </div>
            <div className='admin-lesson-card-right'>
                <button className="admin-lesson-visible-btn" onClick={() => toggleVisibility(public_id)}>Change Visibility</button>
                <button className="admin-lesson-delete-btn" onClick={() => deleteLesson(public_id)}>Delete</button>
                <button className='admin-lesson-card-btn' onClick={() => redirectToViewLesson(public_id)}>View</button>
            </div>
        </div>
    );
}

function InputComponent({placeholder, type, label, value, onChange}){
    return (
    <div className="upload-lesson-input-container">
        <label className="upload-lesson-label">{label}</label>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="upload-lesson-input"/>
    </div>
);
}

export default Lessons
