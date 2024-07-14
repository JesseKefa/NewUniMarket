// frontend/src/components/AdminPage.js

import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './Users';
import Products from './Products';
import Orders from './Orders';
import Categories from './Categories';

const AdminPage = () => {
  return (
    <Router>
      <div className="admin-panel">
        <Sidebar />
        <div className="content">
          <Switch>
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/users" component={Users} />
            <Route path="/admin/products" component={Products} />
            <Route path="/admin/orders" component={Orders} />
            <Route path="/admin/categories" component={Categories} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default AdminPage;
