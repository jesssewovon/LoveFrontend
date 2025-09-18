import { Link, useNavigate } from 'react-router';
import { useTheme } from "../ThemeContext";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import Offcanvas from 'react-bootstrap/Offcanvas';

import api from "../api";
import { setIsLoading, signinPiketplace, setGeolocation,
    changeLanguage, setIsSaving
} from "../store/userSlice";
//import { navigate } from "../navigationService";
import i18n from "../i18n"; // your i18n config

function SwitchLanguage({showLanguageOffCanvas, handleLanguageOffCanvasClose}) {
    //alert(showLanguageOffCanvas)
    const { isSideBarOpen, setSideBarStatus } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation()
    const [show, setShow] = useState(showLanguageOffCanvas)

    const [languages, setLanguages] = useState([
        {name: "English", code: "en"},
        {name: "中国人", code: "cn"},
        {name: "Tiếng Việt", code: "vn"},
        {name: "Español", code: "es"},
        {name: "Français", code: "fr"},
    ])

    useEffect(() => {
        setShow(showLanguageOffCanvas);
    });

    const handleLanguageChange = async (code) => {
        dispatch(changeLanguage(code))
        handleLanguageOffCanvasClose()
    };

    return (
        <>
            <Offcanvas placement={'bottom'} show={show} onHide={handleLanguageOffCanvasClose}>
                <Offcanvas.Header closeButton className="share-style">
                    <Offcanvas.Title>
                        <h6 className="title mb-0">Languages</h6>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="radio style-2">
                        {languages?.map(( {name, code} , index) => {
                            return (
                                <label key={index} className="radio-label" htmlFor={name}>
                                    <input type="radio" name="radio2" value={name}
                                        id={name} 
                                        checked={
                                            i18n.language ===
                                            code
                                        }
                                        onChange={() =>
                                            handleLanguageChange(
                                                code
                                            )
                                        }/>
                                    <span className="checkmark">						
                                        <span className="text">{name}</span>
                                        <span className="check"></span>							
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default SwitchLanguage;