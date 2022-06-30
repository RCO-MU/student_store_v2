import * as React from 'react';
import './Purchases.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, PURCHASE_EXT, noItemsMessage } from '../../constants';
import NotFound from '../NotFound/NotFound';
import '../../globals.css';

export default function Purchases({
  isFetching, setIsFetching, setError, query, setQuery, handleQueryChange,
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

  // **********************************************************************
  // ELEMENT RENDERING
  // **********************************************************************

  // activePurchases = purchases that match filter conditions
  const activePurchases = purchases.filter((purchase) => (
    purchase.email.toLowerCase().includes(query.toLowerCase())
  ));

  // if no products match the filter conditions
  if (activePurchases.length === 0) {
    return (
      <div className="purchases">
        <input
          className="product-query"
          type="input"
          name="query"
          placeholder="Search by email"
          onChange={(e) => handleQueryChange(e.target.value)}
          value={query}
        />
        <button className="search-button" type="button">
          <img
            className="search-icon"
            src="https://i.imgur.com/Q0cXzWQ.png"
            alt="search button"
          />
        </button>
        <h3 className="no-items">{noItemsMessage}</h3>
      </div>
    );
  }

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
      <input
        className="product-query"
        type="input"
        name="query"
        placeholder="Search by email"
        onChange={(e) => handleQueryChange(e.target.value)}
        value={query}
      />
      <button className="search-button" type="button">
        <img
          className="search-icon"
          src="https://i.imgur.com/Q0cXzWQ.png"
          alt="search button"
        />
      </button>
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
          {activePurchases.map((purchase) => (
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
