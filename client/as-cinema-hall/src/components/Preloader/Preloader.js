import React from 'react';

const Preloader = () => {
    return (
        <div className='contact-form-area d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <div className='spinner'>
                <div class="spinner-grow text-success mr-3" role="status">
                </div>
                <div class="spinner-grow text-danger mr-3" role="status">
                </div>
                <div class="spinner-grow text-warning" role="status">
                </div>
                <div class="visually-hidden text-center text-white font-weight-bold mt-3">Loading...</div>
            </div>
        </div>
    );
};

export default Preloader;