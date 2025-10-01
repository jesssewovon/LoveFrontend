import { NavLink, Link } from 'react-router';
import { useSelector } from 'react-redux';

export default function MessageRight({message, time}) {
    const { isSaving } = useSelector((state) => state.user);
    return (
    	<>
          <div className="chat-content user">
            <div className="message-item">
              <div className="bubble">{message}</div>    
              <div className="message-time">{time}</div>    
            </div>
          </div>
		  </>
    );
}