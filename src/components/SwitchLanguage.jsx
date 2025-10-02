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
import 'moment/locale/fr';
import 'moment/locale/es';
import 'moment/locale/ar';
import 'moment/locale/zh-cn';

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
        {name: "عربي", code: "ar"},
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
            moment.updateLocale('fr', {
                months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
                monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
                monthsParseExact : true,
                weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
                weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
                weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
                weekdaysParseExact : true,
                longDateFormat : {
                    LT : 'HH:mm',
                    LTS : 'HH:mm:ss',
                    L : 'DD/MM/YYYY',
                    LL : 'D MMMM YYYY',
                    LLL : 'D MMMM YYYY HH:mm',
                    LLLL : 'dddd D MMMM YYYY HH:mm'
                },
                calendar : {
                    sameDay : '[Aujourd’hui à] LT',
                    nextDay : '[Demain à] LT',
                    nextWeek : 'dddd [à] LT',
                    lastDay : '[Hier à] LT',
                    lastWeek : 'dddd [dernier à] LT',
                    sameElse : 'L'
                },
                relativeTime : {
                    future : 'dans %s',
                    past : 'il y a %s',
                    s : 'quelques secondes',
                    m : 'une minute',
                    mm : '%d minutes',
                    h : 'une heure',
                    hh : '%d heures',
                    d : 'un jour',
                    dd : '%d jours',
                    M : 'un mois',
                    MM : '%d mois',
                    y : 'un an',
                    yy : '%d ans'
                },
                dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
                ordinal : function (number) {
                    return number + (number === 1 ? 'er' : 'e');
                },
                meridiemParse : /PD|MD/,
                isPM : function (input) {
                    return input.charAt(0) === 'M';
                },
                // In case the meridiem units are not separated around 12, then implement
                // this function (look at locale/id.js for an example).
                // meridiemHour : function (hour, meridiem) {
                //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
                // },
                meridiem : function (hours, minutes, isLower) {
                    return hours < 12 ? 'PD' : 'MD';
                },
                week : {
                    dow : 1, // Monday is the first day of the week.
                    doy : 4  // Used to determine first week of the year.
                }
            });
        }else if(code=="es"){
            moment.updateLocale('es', {
                months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
                weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
                relativeTime: {
                    future: 'en %s',
                    past: 'hace %s',
                    s: 'unos segundos',
                    m: 'un minuto',
                    mm: '%d minutos',
                    h: 'una hora',
                    hh: '%d horas',
                    d: 'un día',
                    dd: '%d días',
                    M: 'un mes',
                    MM: '%d meses',
                    y: 'un año',
                    yy: '%d años'
                }
            });
        }else if(code=="ar"){
            moment.updateLocale('ar', {
                months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليوز_غشت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
                weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
                relativeTime : {
                    future : 'بعد %s',
                    past : 'منذ %s',
                    s : 'ثوان',
                    m : 'دقيقة واحدة',
                    mm : '%d دقائق',
                    h : 'ساعة واحدة',
                    hh : '%d ساعات',
                    d : 'يوم واحد',
                    dd : '%d أيام',
                    M : 'شهر واحد',
                    MM : '%d أشهر',
                    y : 'سنة واحدة',
                    yy : '%d سنوات'
                },
                week : {
                    dow : 6, // Saturday is the first day of the week in Arabic regions
                    doy : 12
                }
            });
        }else if(code=="cn"){
            moment.updateLocale('zh-cn', {
                months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
                weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
                relativeTime: {
                    future: '%s后',
                    past: '%s前',
                    s: '几秒',
                    m: '1 分钟',
                    mm: '%d 分钟',
                    h: '1 小时',
                    hh: '%d 小时',
                    d: '1 天',
                    dd: '%d 天',
                    M: '1 个月',
                    MM: '%d 个月',
                    y: '1 年',
                    yy: '%d 年'
                },
                week: {
                    dow: 1, // Monday is the first day of the week in China
                    doy: 4
                }
            });
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