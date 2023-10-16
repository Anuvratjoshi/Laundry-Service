import React from 'react';

const Career = () => {

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 font-Montserrat">
            <div className="max-w-lg p-8 bg-white shadow-md rounded-md xxl:text-base xl:text-base lg:text-base md:text-sm sm:text-sm es:text-xs">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#5861AE]">Join Our Team</h2>
                <p className="text-gray-600 mb-4 text-center">
                    Exciting opportunities await! While there are no open positions right now, we're always on the lookout for talented individuals. Submit your resume, and we'll get in touch when a suitable position arises.
                </p>
                <div className="text-center mb-6">
                    <img
                        src="https://source.unsplash.com/400x200/?office,team"
                        alt="No Openings Illustration"
                        className="mx-auto rounded-md shadow-md"
                    />
                </div>
                <div className="flex justify-center">
                    <button className="bg-[#5861AE] text-white py-2 px-4 rounded-md hover:bg-[#475092]">
                        Submit Resume
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Career;
