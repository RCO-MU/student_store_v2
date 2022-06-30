import * as React from 'react';
import './PurchaseDetail.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL, PURCHASE_EXT } from '../../constants';
import NotFound from '../NotFound/NotFound';
import '../../globals.css';

export default function PurchaseDetail({
  isFetching, setIsFetching, setError,
}) {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [purchase, setPurchase] = useState({});

  // **********************************************************************
  // URL PARAMS
  // **********************************************************************

  const { purchaseId } = useParams();

  // **********************************************************************
  // AXIOS GET
  // **********************************************************************

  async function fetchPurchase(id) {
    setIsFetching(true);
    try {
      const { data } = await axios.get(`${API_URL}${PURCHASE_EXT}/${id}`);
      console.log('Purchase ', data.purchase);
      setPurchase(data.purchase);
      setError('');
    } catch (err) {
      console.error(err);
      setError('purchase not found');
      setPurchase(undefined);
    }
    setIsFetching(false);
  }

  // **********************************************************************
  // FETCH DATA ON PAGE LOAD
  // **********************************************************************

  useEffect(async () => {
    await fetchPurchase(purchaseId);
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (isFetching) {
    return (
      <div className="loading-wrapper">
        <h1 className="loading-card">Loading...</h1>
      </div>
    );
  }
  // if purchases fetch does not succeed
  if (purchase.id === undefined) {
    return (<NotFound />);
  }
  console.log('purchase', purchase);
  console.log('receipt', purchase.receipt);
  return (
    <div className="purchase-detail">
      <Link
        to="/purchases"
      >
        <button className="back purchase" type="button">
          ← Back to purchases
        </button>
      </Link>
      <br />
      <br />
      <h2><u>Purchase Details:</u></h2>
      <p>
        <b>{'Purchase ID: '}</b>
        {`${purchase.id}`}
      </p>
      <p>
        <b>{'Name: '}</b>
        {`${purchase.name}`}
      </p>
      <p>
        <b>{'Email: '}</b>
        {`${purchase.email}`}
      </p>
      <p><b><u>Itemized Receipt:</u></b></p>
      {purchase.receipt.map((line) => {
        // weird key generation
        const lineArr = line.split(' ');
        return <p key={lineArr[1]}><i>{`• ${line}`}</i></p>;
      })}
      <p>
        <b>{'Subtotal: '}</b>
        {`${purchase.subtotal}`}
      </p>
      <p>
        <b>{'Taxes and fees: '}</b>
        {`${purchase.tax}`}
      </p>
      <p>
        <b>{'Grand Total: '}</b>
        {`${purchase.total}`}
      </p>
      <p>
        <b>{'Purchase completed on: '}</b>
        {`${purchase.createdAt}`}
      </p>
    </div>
  );
}
