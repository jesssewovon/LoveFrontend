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

import moment from 'moment';

/* import 'moment/locale/es';
import 'moment/locale/ar';
import 'moment/locale/zh-cn';
import 'moment/locale/vi'; */

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
        {name: "عربي", code: "ar"},
        {name: "Español", code: "es"},
        {name: "Français", code: "fr"},
        {name: "Filipino", code: "fil"},
        {name: "Bahasa Indo", code: "id"},
        {name: "한국어", code: "ko"},
        {name: "ภาษาไทย", code: "th"},
    ])

    useEffect(() => {
        setShow(showLanguageOffCanvas);
    });

    const handleLanguageChange = async (code) => {
        updateMoment(code)
        dispatch(changeLanguage(code))
        handleLanguageOffCanvasClose()
    };
    const updateMoment = async (code) => {
        if (code=="fr") {
            moment.locale('fr')
        }else if(code=="es"){
            moment.locale('es')
        }else if(code=="ar"){
            moment.locale('ar')
        }else if(code=="cn"){
            moment.locale('zh-cn')
        }else if(code=="vn"){
            moment.locale('vi')
        }else if(code=="fi"){
            moment.locale('fil')
        }else if(code=="id"){
            moment.locale('id')
        }else if(code=="th"){
            moment.locale('th')
        }else if(code=="ko"){
            moment.locale('ko')
        }else{
            moment.locale('en')
        }
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