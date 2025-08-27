import { Link } from 'react-router';

import Header from '../components/Header';

export default function ChatList() {
  return (
    <>
      <Header showBackButton={true} title={"New Matches"} showWishList={false}/>
      <div className="page-content space-top p-b60">
        ChatList  
      </div>
    </>
  );
}