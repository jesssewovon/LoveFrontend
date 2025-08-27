import { Link } from 'react-router';

import Header from '../components/Header';

import { useSelector, useDispatch } from "react-redux";

import { signinPiketplace } from '../varsSlice';
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loader from '../components/Loader';

export default function Profile() {
  const MySwal = withReactContent(Swal);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("fr")
  }, [i18n])
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.vars);
  const handleLogin = async () => {
    const scopes = ["username", "payments", "wallet_address", "preferred_language"];
      const onIncompletePaymentFound = (payment) =>{
          //console.log('signin onIncompletePaymentFound', payment)
          const txid = payment.transaction.txid;
          const txUrl = payment.transaction._link;
          const paymentId = payment.identifier;
          const data = {
              paymentId:paymentId,
              txid:txid,
          }
          //self.executePaymentCompletion(data)
          //We're not allowed to cancel a payment after approve
          //this.dispatch('cancelPayment', data)
      };
    dispatch(signinPiketplace({ scopes, onIncompletePaymentFound }));
  };
  return (
    <>
      <Header showBackButton={true} title={"Profile"} showWishList={false} classes={"bg-white"}/>
      <div className="page-content space-top p-b60">
        Profile
      </div>
    </>
  );
}