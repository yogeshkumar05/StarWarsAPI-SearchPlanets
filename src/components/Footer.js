import React, { Component } from 'react';
import constants from '../common/constants';
export default function Footer() {
    return (
        <footer className="footer">
            <div>&copy; {constants.FOOTER}</div>
        </footer>)
}