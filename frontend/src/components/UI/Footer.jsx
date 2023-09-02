import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-center py-2 text-white" style={{ fontSize: "14px" }}>
            <p>&copy; {currentYear} Kanban Board. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
