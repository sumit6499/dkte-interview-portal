
import React from 'react';
import '@/App.css'; 
function SkeletonLoader() {
    return (
        <div className="skeleton-loader">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-info">
                <div className="skeleton-line skeleton-line-short"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
            </div>
        </div>
    );
}

export default SkeletonLoader;
