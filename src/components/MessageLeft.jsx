import { NavLink, Link } from 'react-router';
import { useSelector } from 'react-redux';

export default function MessageLeft({message, time}) {
    const { isSaving } = useSelector((state) => state.user);
    return (
    	<>
          <div className="chat-content">
            <div className="message-item">
              <div className="bubble">{message}</div>    
              <div className="message-time">{time}</div>    
            </div>
          </div>
		  </>
    );
}