import * as React from 'react';
import './Purchases.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, PURCHASE_EXT } from '../../constants';
import NotFound from '../NotFound/NotFound';
import '../../globals.css';

export default function Purchases({
  isFetching, setIsFetching, setError, setQuery,
}) {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [purchases, setPurchases] = useState([]);

  // **********************************************************************
  // AXIOS GET
  // **********************************************************************

  async function fetchAllPurchases() {
    setIsFetching(true);
    try {
      const { data } = await axios.get(`${API_URL}${PURCHASE_EXT}`);
      console.log('Purchases ', data.purchases);
      setPurchases(data.purchases);
      setError('');
    } catch (err) {
      console.error(err);
      setError('purchases not found');
      setPurchases(undefined);
    }
    setIsFetching(false);
  }

  // **********************************************************************
  // FETCH DATA ON PAGE LOAD
  // **********************************************************************

  useEffect(async () => {
    await fetchAllPurchases();
    setQuery('');
  }, []);

  // loading
  if (isFetching) {
    return (
      <div className="loading-wrapper">
        <h1 className="loading-card">Loading...</h1>
      </div>
    );
  }
  // if purchases fetch does not succeed
  if (purchases === undefined) {
    return (<NotFound />);
  }
  return (
    <div className="purchases">
      <table className="purchase-table">
        <thead>
          <tr className="purchase-row">
            <th className="purchases header id"><u>ID</u></th>
            <th className="purchases header name"><u>Name</u></th>
            <th className="purchases header email"><u>Email</u></th>
            <th className="purchases header total"><u>Total</u></th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id} className="purchase-row">
              <td className="purchases item-cell id">
                <Link
                  to={`/purchases/${purchase.id}`}
                  onClick={() => { window.scroll(0, 0); }}
                >
                  {`00${purchase.id}`}
                </Link>
              </td>
              <td className="purchases item-cell name">{purchase.name}</td>
              <td className="purchases item-cell email">{purchase.email}</td>
              <td className="purchases item-cell total">{purchase.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
